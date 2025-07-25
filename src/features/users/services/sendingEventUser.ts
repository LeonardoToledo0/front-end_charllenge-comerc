import { toast } from "vue3-toastify";
import { regexCPF, regexPassword } from "../../../shared/utils/regex";
import bcrypt from 'bcryptjs';
import type { BaseRegistration } from "../../../shared/types/registrations.interface";
import type { UserRegister } from "../types/interface.user";

type SendTypes<T extends 'users'> = T extends "users" ? UserRegister : never;

interface SendingEventParams<T extends 'users'> {
    props: BaseRegistration & { type: T };
    emit: (event: "submit", payload: SendTypes<T>) => void;
    formData: Record<string, string>;
}

export const sendingEventUser = async <T extends 'users'>({
    emit,
    formData,
}: SendingEventParams<T>) => {

    const data = { ...formData };

    data.document = (data.document || "").replace(/\D/g, "");

    if (!regexCPF.test(data.document)) {
        toast.error("Documento inválido");
        return;
    }


    if (!regexPassword.test(data.password)) {
        toast.error("Senha inválida");
        return;
    }

    const requiredFields = [
        "name",
        "document",
        "password",

    ];

    for (const field of requiredFields) {
        if (!data[field] || data[field].length === 0) {
            toast.error(`Campo ${field} é obrigatório`);
            return;
        }
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const payload: UserRegister = {
        id: crypto.randomUUID(),
        name: data.name,
        password: hashedPassword,
        status: "active",
        document: data.document,

    };

    emit("submit", payload as SendTypes<T>);
};
