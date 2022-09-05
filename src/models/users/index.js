import Joi from 'joi';
import { ApiError, ErrorStatus } from '../../services/error'

export default class Users {
    constructor(name, lastname, phone, email, password) {
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.password = password;

    }

    static validate(user, requerido) {
		const schema = Joi.object({
			name: requerido? Joi.string().required() :  Joi.string(),
			lastname: requerido? Joi.string().required() :  Joi.string(),
            phone: requerido? Joi.number().required() :  Joi.number(),
			email: requerido? Joi.string().required() :  Joi.string(),
            password: requerido? Joi.string().required() :  Joi.string(),
            admin: Joi.boolean()
		});

    const { error } = schema.validate(user);

    if (error) throw new ApiError('Invalid Schema', ErrorStatus.BadRequest);
    }
}
