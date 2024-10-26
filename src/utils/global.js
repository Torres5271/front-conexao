import { toast } from "react-toastify";

export function logoutUsuario() {
  sessionStorage.removeItem("token");
}

export function logado(token) {
  if (token === null || token === "" || token === undefined) {
    return false;
  } else {
    return true;
  }
}

export function isSelected(campo, nome) {
  if (campo === undefined || campo.value === undefined || campo.value === null || campo.value === "Criar") {
    toast.warn(`Selecione o campo ${nome}`);
    return false;
  }

  return true;
}

export function isVazio(campo, nome) {
  if (campo === "") {
    toast.warn(`O campo ${nome} deve ser preenchido!`);
    return true;
  }
  return false;
}

export function isValidEmail(email, nomeCampo) {
  if (email.indexOf("@") !== -1) {
    return true;
  }

  toast.warn(`${nomeCampo} inválido.`);
  return false;
}

export function isLengthValid(campo, tamanho, nome) {
  if (campo.length >= tamanho) {
    return true;
  }

  toast.warn(`O campo ${nome} deve ter no mínimo ${tamanho} caracteres`);
  return false;
}

export function transformarDouble(dataString) {
  const valor = dataString.toString();
  return parseFloat(valor).toFixed(2).replace(".", ",");
}

export function transformarData(dataString) {
  const data = new Date(dataString);
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export function transformarDataHora(dataString) {
  const data = new Date(dataString);
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear().toString().substring(2, 4);
  const hora = data.getHours().toString().padStart(2, "0");
  const minutos = data.getMinutes().toString().padStart(2, "0");
  // const segundos = data.getSeconds().toString().padStart(2, "0");
  return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
}


export function transformarDataBd(dataString) {
  const data = new Date(dataString);
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${ano}-${mes}-${dia}`;
}

export function transformarHora(horaString) {
  const data = new Date(
    0,
    0,
    0,
    horaString.toString().slice(0, 2),
    horaString.toString().slice(3, 5)
  );
  const hora = data.getHours().toString().padStart(2, "0");
  const minutos = data.getMinutes().toString().padStart(2, "0");
  const segundos = data.getSeconds().toString().padStart(2, "0");
  return `${hora}:${minutos}:${segundos}`;
}

export function transformarDataHoraBd(dataString, horaString){
  return transformarDataBd(dataString) + "T" + transformarHora(horaString)
}
  
export function transformarTelefoneCelular(telefoneString) {
  return telefoneString.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

export function transformarTelefoneFixo(telefoneString) {
  return telefoneString.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}

export function inputTelefone(e) {
  console.log(e.target.value.length)
  e.target.value = e.target.value.length > 14 ? e.target.value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3") : e.target.value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}

export const inputSomenteTexto = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-zÀ-ú\s]/g, "");
};

export const inputSomenteNumero = (e) => {
  e.target.value = e.target.value.replace(/[^\d+(,\d{1,2})?$]/g, "");
};

export const inputValorMonetario = (e) =>{
  var valorAlterado = e.target.value;
  valorAlterado = valorAlterado.replace(/\D/g, ""); // Remove todos os não dígitos
  valorAlterado = valorAlterado.replace(/(\d+)(\d{2})$/, "$1,$2"); // Adiciona a parte de centavos
  valorAlterado = valorAlterado.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona pontos a cada três dígitos
  valorAlterado = "R$ " + valorAlterado;
  e.target.value = valorAlterado;
}

export const inputValorPorcentagem = (e) => {
  var valorAlterado = e.target.value;
  valorAlterado = valorAlterado.replace(/\D/g, ""); // Remove todos os não dígitos
  valorAlterado = valorAlterado.replace(/(\d+)(\d{2})$/, "$1,$2"); // Adiciona a parte de centavos
  e.target.value = valorAlterado;
}

export const inputSemCaracteresEspeciais = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-zÀ-ú0-9\s]/g, "");
};

export function aberturaMaiorFechamento(hora1, hora2) {
  console.log("Abc de natal");
  console.log(hora1);
  let horaAbertura = new Date(
    0,
    0,
    0,
    hora1.toString().slice(0, 2),
    hora1.toString().slice(3, 5)
  );
  let horaFechamento = new Date(
    0,
    0,
    0,
    hora1.toString().slice(0, 2),
    hora1.toString().slice(3, 5)
  );

  if (horaAbertura.getHours() >= horaFechamento.getHours()) {
    if (horaAbertura.getMinutes() > horaFechamento.getMinutes()) {
      toast.warn(
        "A hora de fechamento deve ser maior que a hora de abertura!"
      );
      return true;
    }
  } else {
    return false;
  }
}
