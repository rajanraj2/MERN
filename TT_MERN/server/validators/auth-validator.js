import { z } from "zod";

const signupSchema = z.object({
    username: z
    .string({required_error: "Name is required"})
    .trim()
    .min(6, {message: "Name must be of atleast 6 characters"})
    .max(20, {message: "Name must be of atmost 20 characters"}),
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .min(3, {message: "Email must be of atleast 3 characters"})
    .max(255, {message: "Email must be of atmost 255 characters"}),
    phone: z
    .string({required_error: "Phone is required"})
    .trim()
    .min(10, {message: "Phone must be of atleast 10 characters"})
    .max(20, {message: "Phone must be of atmost 20 characters"}),
    password: z
    .string({required_error: "Password is required"})
    .trim()
    .min(8, {message: "Password must be of atleast 8 characters"})
    .max(100, {message: "Password must be of atmost 100 characters"}),
});

export default signupSchema;