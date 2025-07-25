import { toast } from "vue3-toastify";
import { regexCPF, regexEmail, regexPhone } from "../../../shared/utils/regex";
import type { ConsumerRegister } from "../types/interface.consumer";
import type { BaseRegistration } from "../../../shared/types/registrations.interface";

type SendTypes<T extends 'consumer'> = T extends "consumer" ? ConsumerRegister : never;

interface SendingEventParams<T extends 'consumer'> {
    props: BaseRegistration & { type: T };
    emit: (event: "submit", payload: SendTypes<T>) => void;
    formData: Record<string, string>;
}

export const sendingEventRegistrations = <T extends 'consumer'>({
    emit,
    formData,
}: SendingEventParams<T>) => {

    const data = { ...formData };

    data.document = (data.document || "").replace(/\D/g, "");

    if (!regexCPF.test(data.document)) {
        toast.error("Documento inválido");
        return;
    }

    if (!regexEmail.test(data.email)) {
        toast.error("Email inválido");
        return;
    }

    if (!regexPhone.test(data.phone)) {
        toast.error("Telefone inválido");
        return;
    }

    const requiredFields = [
        "firstName",
        "lastName",
        "document",
        "email",
        "phone",
        "street",
        "number",
        "neighborhood",
        "city",
        "state",
        "country",
        "zipCode",
    ];

    for (const field of requiredFields) {
        if (!data[field] || data[field].length === 0) {
            toast.error(`Campo ${field} é obrigatório`);
            return;
        }
    }

    const payload: ConsumerRegister = {
        id: crypto.randomUUID(),
        firstName: data.firstName,
        lastName: data.lastName,
        document: data.document,
        email: data.email,
        phone: data.phone,
        address: [
            {
                street: data.street,
                number: data.number,
                neighborhood: data.neighborhood,
                city: data.city,
                state: data.state,
                country: data.country,
                zipCode: data.zipCode,
            },
        ],
    };

    emit("submit", payload as SendTypes<T>);
};
