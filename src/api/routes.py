import bcrypt # encriptar mis contraseñas
from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User

api = Blueprint('api', __name__)

# Registro

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "El usuario ya existe"}), 400   #Verificación si existe o no el usuario

    # Generar salt y encriptar password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

    user = User.crear_user(email=email, password=hashed_password.decode('utf-8'), is_active=True)
    return jsonify(user.serialize()), 201



# Login
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Credenciales inválidas"}), 401

    # Verificar password con bcrypt
    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"msg": "Credenciales inválidas"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token, "user": user.serialize()}), 200


# Ruta protegida
@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)
    return jsonify(user.serialize()), 200
