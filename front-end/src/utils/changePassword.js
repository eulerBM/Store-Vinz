class changePassword {

    static validPassword(newPass, oldPass) {
        if (!newPass || !oldPass) {
            return "Os campos de senha são obrigatórios.";
        }

        if (newPass.length < 5 || newPass.length > 50) {
            return "Sua senha deve ter entre 5 e 50 caracteres.";
        }

        if (!/[a-zA-Z]/.test(newPass)) {
            return "Sua senha deve conter pelo menos uma letra.";
        }

        if (!/\d/.test(newPass)) {
            return "Sua senha deve conter pelo menos um número.";
        }

        if (!/[@$!%*?&]/.test(newPass)) {
            return "Sua senha deve conter pelo menos um caractere especial (@$!%*?&).";
        }

        if (/\s/.test(newPass)) {
            return "Sua senha não pode conter espaços.";
        }

        const emojiRegex = /[\u{1F600}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}]/u;
        if (emojiRegex.test(newPass)) {
            return "Sua senha não pode conter emojis.";
        }

        if (newPass === oldPass) {
            return "A nova senha não pode ser igual à senha antiga.";
        }

        return true; 
    }
}

export default changePassword;
