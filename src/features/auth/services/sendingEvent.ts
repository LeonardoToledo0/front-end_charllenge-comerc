import { toast } from "vue3-toastify";
import { regexCPF, regexPassword } from "../../../shared/utils/regex";
import type { UserLogin, UserRegister } from "../../users";
import type { BaseAuth } from "../types/auth.interface";

type SendTypes<T extends 'login' | 'register'> = T extends 'login' ? UserLogin : UserRegister;

interface SendingEventParams<T extends 'login' | 'register'> {
    e: Event;
    props: BaseAuth & { type: T };
    emit: (event: 'submit', payload: SendTypes<T>) => void;
}

export const sendingEvent = <T extends 'login' | 'register'>({ e, props, emit }: SendingEventParams<T>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const inputs = form.querySelectorAll('input');

    const data: Record<string, string> = {};
    inputs.forEach(input => {
        if (input instanceof HTMLInputElement && input.id) {
            data[input.id] = input.value;
        }
    });

    console.log('Dados coletados do formulário:', data);

    const rawDocument = (data.document || '').replace(/\D/g, '');

    const validations: Record<string, { regex: RegExp; message: string }> = {
        password: { regex: regexPassword, message: 'Senha inválida' },
        document: { regex: regexCPF, message: 'Documento inválido' },
    };

    const fieldsToValidate = props.type === 'login'
        ? ['document', 'password']
        : ['name', 'document', 'password'];

    for (const field of fieldsToValidate) {
        let value = data[field] || '';

        if (field === 'document') {
            value = rawDocument;
        }


        const validation = validations[field];
        if (validation && !validation.regex.test(value)) {
            console.log(`Erro na validação do campo ${field}:`, value);
            toast.error(validation.message);
            return;
        }


        if (field === 'name' && !value.trim()) {
            console.log('Nome não pode ser vazio');
            toast.error('Nome é obrigatório');
            return;
        }
    }

    if (props.type === 'login') {
        const loginPayload: UserLogin = {
            document: rawDocument,
            password: data.password || '',
        };
        console.log('Payload de login:', loginPayload);
        emit('submit', loginPayload as SendTypes<T>);
    } else {
        if (!data.passwordConfirmation) {
            toast.error('Confirme a senha');
            return;
        }
        if (data.password !== data.passwordConfirmation) {
            toast.error('As senhas não coincidem!');
            return;
        }

        const registerPayload: UserRegister = {
            id: crypto.randomUUID(),
            name: data.name || '',
            document: rawDocument,
            password: data.password || '',
            status: 'active',
        };
        console.log(' Dados de registro:', registerPayload);
        emit('submit', registerPayload as SendTypes<T>);
    }

}
