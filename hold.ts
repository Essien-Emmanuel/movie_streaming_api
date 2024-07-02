
const SUPPORTED_LANGUAGES = ["en", "es", "it"]
// this syntax is equals to "en" | "es" | "it"
export type Language = typeof SUPPORTED_LANGUAGES[number] 

import { ZodError } from "zod";

export function formatZodError(error: ZodError): any[] {
	return error.errors.map((err) => {
		const { path, message } = err;
		const target = path.join(".");
		const propertyName = path[path.length - 1];
		return {
			target,
			propertyName,
			constraints: { message },
			options: {}, // You can populate options based on your requirements
		};
	});
}