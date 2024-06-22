import HttpStatusCodes from 'http-status-codes'
import { APIError as GenericError } from '../../core/APIError';


export class ServiceError extends GenericError {
    constructor(message: string) {
        super(message, HttpStatusCodes.BAD_REQUEST);
    }
}


export class ResourceConflictError extends GenericError {
	constructor(message = "Already Exist!") {
		super(message, HttpStatusCodes.CONFLICT);
	}
}

export class ValidationError extends GenericError {
    public errors: any;
	constructor(message = "Invalid Input!", errors = []) {
		super(message, HttpStatusCodes.UNPROCESSABLE_ENTITY);
		this.errors = errors;
	}
}

export class AuthenticationError extends GenericError {
	constructor(message = "Authentication Failed!") {
		super(message, HttpStatusCodes.FORBIDDEN);
	}
}

export class AuthorizationError extends GenericError {
	constructor(message = "you are not authorized to perform this action") {
		super(message, HttpStatusCodes.UNAUTHORIZED);
	}
}

export class NotFoundError extends GenericError {
	constructor(message = "Not Found!") {
		super(message, HttpStatusCodes.NOT_FOUND);
	}
}

export class InternalServerError extends GenericError {
  constructor(message = "Internal Server Error") {
    super(message, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}