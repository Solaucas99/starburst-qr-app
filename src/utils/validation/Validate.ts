import validator from 'validator';

interface ValidationReturn {
  valid: boolean;
  message: string | string[];
  status: 'error' | 'success';
}

interface AmplifySignInAttr {
  username: string;
  password: string;
}

interface AmplifyNewPassAttr {
  password: string;
  name: string;
  nickname: string;
  phone: string;
}

interface VisitorsSignIn {
  cpf: string;
  name: string;
  email: string;
  phone: string;
  isCaptchaChecked: boolean;
}

interface VisitorsUpdate {
  name: string;
  email: string;
  phone: string;
  isCaptchaChecked: boolean;
}

class Validate {
  public static VisitorsSignIn(visitorsAttr: VisitorsSignIn): ValidationReturn {
    const errors: string[] = [];

    const emptyFields = Validate.checkEmptyFields(visitorsAttr);
    if (!emptyFields.valid && typeof emptyFields.message === 'string') {
      errors.push(emptyFields.message);
    }

    if (visitorsAttr.name.length < 5) {
      errors.push('O campo nome é muito pequeno. Insira seu nome completo.');
    }

    if (
      visitorsAttr.name.charAt(0).repeat(visitorsAttr.name.length) ===
      visitorsAttr.name
    ) {
      errors.push('O campo nome está inválido. Preencha novamente.');
    }

    if (!Validate.validateCPF(visitorsAttr.cpf)) {
      errors.push('O CPF inserido é inválido. Preencha novamente.');
    }

    if (!validator.isEmail(visitorsAttr.email)) {
      errors.push('O e-mail inserido é inválido. Preencha novamente.');
    }

    if (
      !validator.isMobilePhone(visitorsAttr.phone, 'pt-BR', {
        strictMode: true,
      })
    ) {
      errors.push('O e-mail inserido é inválido. Preencha novamente.');
    }

    if (!visitorsAttr.isCaptchaChecked) {
      errors.push('Você precisa clicar em "Não sou um robô" para continuar.');
    }

    if (errors.length > 0) {
      return {
        valid: false,
        message: errors,
        status: 'error',
      };
    }

    return {
      valid: true,
      message: 'Todos os campos estão válidos.',
      status: 'success',
    };
  }

  public static VisitorsUpdate(visitorsAttr: VisitorsUpdate): ValidationReturn {
    const errors: string[] = [];

    const emptyFields = Validate.checkEmptyFields(visitorsAttr);
    if (!emptyFields.valid && typeof emptyFields.message === 'string') {
      errors.push(emptyFields.message);
    }

    if (visitorsAttr.name.length < 5) {
      errors.push('O campo nome é muito pequeno. Insira seu nome completo.');
    }

    if (
      visitorsAttr.name.charAt(0).repeat(visitorsAttr.name.length) ===
      visitorsAttr.name
    ) {
      errors.push('O campo nome está inválido. Preencha novamente.');
    }

    if (!validator.isEmail(visitorsAttr.email)) {
      errors.push('O e-mail inserido é inválido. Preencha novamente.');
    }

    if (
      !validator.isMobilePhone(visitorsAttr.phone, 'pt-BR', {
        strictMode: true,
      })
    ) {
      errors.push('O e-mail inserido é inválido. Preencha novamente.');
    }

    if (!visitorsAttr.isCaptchaChecked) {
      errors.push('Você precisa clicar em "Não sou um robô" para continuar.');
    }

    if (errors.length > 0) {
      return {
        valid: false,
        message: errors,
        status: 'error',
      };
    }

    return {
      valid: true,
      message: 'Todos os campos estão válidos.',
      status: 'success',
    };
  }

  public static validateCPF(cpf: string): boolean {
    const filterCPF = cpf.replace(/\D+/g, '');

    if (filterCPF.length !== 11) return false;

    if (filterCPF.charAt(0).repeat(11) === filterCPF) return false;

    const cpfProcessado = filterCPF.slice(0, -2);

    const digit1 = Validate.createCPFDigits(cpfProcessado);
    const digit2 = Validate.createCPFDigits(cpfProcessado + digit1);

    const cpfLimpo = cpfProcessado + digit1 + digit2;

    return cpfLimpo === filterCPF;
  }

  public static AmplifySignIn(
    signInAttributes: AmplifySignInAttr
  ): ValidationReturn {
    const emptyFields = Validate.checkEmptyFields(signInAttributes);
    if (!emptyFields.valid) {
      return emptyFields;
    }

    const passwordTest = Validate.validateAmplifyPassword(
      signInAttributes.password
    );
    if (!passwordTest.valid) {
      return passwordTest;
    }

    return {
      valid: true,
      message: 'Todos os campos estão válidos.',
      status: 'success',
    };
  }

  public static AmplifyRequireNewPassword(
    reqNewPassAttributes: AmplifyNewPassAttr
  ): ValidationReturn {
    const emptyFields = Validate.checkEmptyFields(reqNewPassAttributes);
    if (!emptyFields.valid) {
      return emptyFields;
    }

    const passwordTest = Validate.validateAmplifyPassword(
      reqNewPassAttributes.password
    );
    if (!passwordTest.valid) {
      return passwordTest;
    }

    const phoneTest = Validate.validateAmplifyPhoneNumber(
      reqNewPassAttributes.phone
    );
    if (!phoneTest.valid) {
      return phoneTest;
    }

    return {
      valid: true,
      message: 'Todos os campos estão válidos.',
      status: 'success',
    };
  }

  public static checkEmptyFields(fields: unknown): ValidationReturn {
    const obj: string[] = Object.values(fields);

    // eslint-disable-next-line
    for (const value in obj) {
      if (obj[value].length === 0) {
        return {
          valid: false,
          message: 'Existem campos vazios no formulário. Preencha novamente.',
          status: 'error',
        };
      }
    }

    return {
      valid: true,
      message: 'Todos os campos estão válidos.',
      status: 'success',
    };
  }

  public static validateAmplifyPhoneNumber(
    phoneNumber: string
  ): ValidationReturn {
    if (
      !validator.isMobilePhone(phoneNumber, 'pt-BR', {
        strictMode: true,
      })
    ) {
      return {
        valid: false,
        message: 'Celular inválido',
        status: 'error',
      };
    }
    return {
      valid: true,
      message: 'Celular válido.',
      status: 'success',
    };
  }

  public static validateAmplifyPassword(password: string): ValidationReturn {
    if (password.length < 8) {
      return {
        valid: false,
        message: 'Tamanho de senha inválido.',
        status: 'error',
      };
    }

    return {
      valid: true,
      message: 'Senha válida.',
      status: 'success',
    };
  }

  private static createCPFDigits(cpf: string): string {
    let total = 0;
    let tamanho = cpf.length + 1;

    const cpfArr = cpf.split('');

    cpfArr.forEach(cpfNum => {
      total += Number(cpfNum) * tamanho;
      tamanho -= 1;
    });

    // for (const numero of cpf) {
    //   total += Number(numero) * tamanho;
    //   tamanho -= 1;
    // }

    const digito = 11 - (total % 11);
    return digito <= 9 ? String(digito) : '0';
  }
}

export default Validate;
