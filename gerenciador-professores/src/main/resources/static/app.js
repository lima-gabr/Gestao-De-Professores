const API = '/professores';

let idParaExcluir = null;
let idEmEdicao = null;

document.addEventListener('DOMContentLoaded', carregarProfessores);

function mostrarLista() {
    document.getElementById('tela-lista').style.display = 'flex';
    document.getElementById('tela-form').style.display = 'none';
    carregarProfessores();
}

function mostrarFormIncluir() {
    idEmEdicao = null;
    document.getElementById('form-titulo').textContent = 'Incluir novo professor';
    limparFormulario();
    document.getElementById('tela-lista').style.display = 'none';
    document.getElementById('tela-form').style.display = 'flex';
}

async function mostrarFormAlterar(id) {
    try {
        const resp = await fetch(`${API}/${id}`);
        if (!resp.ok) throw new Error('Professor não encontrado.');

        const prof = await resp.json();
        idEmEdicao = id;

        document.getElementById('form-titulo').textContent = `Alterar professor - ID ${id}`;
        document.getElementById('nome').value = prof.nome || '';
        document.getElementById('matricula').value = prof.matricula || '';
        document.getElementById('disciplina').value = prof.disciplina || '';
        document.getElementById('observacoes').value = prof.observacoes || '';

        const valorAtivo = prof.ativo !== false ? 'true' : 'false';
        document.querySelector(`input[name="ativo"][value="${valorAtivo}"]`).checked = true;

        limparErros();
        document.getElementById('msg-erro').style.display = 'none';
        document.getElementById('tela-lista').style.display = 'none';
        document.getElementById('tela-form').style.display = 'flex';
    } catch (e) {
        alert('Erro ao carregar dados do professor: ' + e.message);
    }
}

async function carregarProfessores() {
    try {
        const resp = await fetch(API);
        if (!resp.ok) throw new Error('Erro HTTP ' + resp.status);
        const professores = await resp.json();
        renderizarLista(professores);
    } catch (e) {
        document.getElementById('lista-professores').innerHTML =
            '<p class="erro-lista">Erro ao carregar professores. Verifique se o servidor está rodando.</p>';
    }
}

function renderizarLista(professores) {
    const container = document.getElementById('lista-professores');

    if (professores.length === 0) {
        container.innerHTML = '<p class="sem-professores">Nenhum professor cadastrado ainda.</p>';
        return;
    }

    container.innerHTML = professores.map(prof => `
        <div class="card-professor ${prof.ativo ? '' : 'card-desativado'}">
            <div class="card-info">
                <strong>${prof.nome}</strong>
                <p><strong>Matrícula:</strong> ${prof.matricula}</p>
                <p><strong>Disciplina:</strong> ${prof.disciplina}</p>
            </div>
            <div class="card-acoes">
                ${!prof.ativo ? '<span class="tag-desativado">DESATIVADO</span>' : ''}
                <div class="grupo-botoes">
                    <button class="btn-alterar" onclick="mostrarFormAlterar(${prof.id})">Alterar</button>
                    <button class="btn-excluir" onclick="abrirModal(${prof.id})">Excluir</button>
                </div>
            </div>
        </div>
    `).join('');
}

async function salvar(evt) {
    evt.preventDefault();
    limparErros();
    document.getElementById('msg-erro').style.display = 'none';

    const nome = document.getElementById('nome').value.trim();
    const matricula = document.getElementById('matricula').value.trim();
    const disciplina = document.getElementById('disciplina').value.trim();
    const ativo = document.querySelector('input[name="ativo"]:checked').value === 'true';
    const observacoes = document.getElementById('observacoes').value.trim();

    let valido = true;
    if (!nome) {
        document.getElementById('err-nome').textContent = 'Nome é obrigatório.';
        valido = false;
    } else if (nome.length < 5) {
        document.getElementById('err-nome').textContent = 'Nome deve ter no mínimo 5 caracteres.';
        valido = false;
    }
    if (!matricula) {
        document.getElementById('err-matricula').textContent = 'Matrícula é obrigatória.';
        valido = false;
    }
    if (!disciplina) {
        document.getElementById('err-disciplina').textContent = 'Disciplina é obrigatória.';
        valido = false;
    } else if (disciplina.length < 5) {
        document.getElementById('err-disciplina').textContent = 'Disciplina deve ter no mínimo 5 caracteres.';
        valido = false;
    }
    if (!valido) return;

    const dados = { nome, matricula, disciplina, ativo, observacoes };

    try {
        let resp;
        if (idEmEdicao) {
            resp = await fetch(`${API}/${idEmEdicao}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        } else {
            resp = await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        }

        if (!resp.ok) {
            const erros = await resp.json();
            const mensagens = Object.values(erros).join(' ');
            const msgErro = document.getElementById('msg-erro');
            msgErro.textContent = mensagens || 'Erro ao salvar. Verifique os dados informados.';
            msgErro.style.display = 'block';
            return;
        }

        mostrarMensagemSucesso(idEmEdicao ? 'Professor alterado com sucesso!' : 'Professor cadastrado com sucesso!');
        mostrarLista();
    } catch (e) {
        const msgErro = document.getElementById('msg-erro');
        msgErro.textContent = 'Erro de conexão. Verifique se o servidor está rodando.';
        msgErro.style.display = 'block';
    }
}

function abrirModal(id) {
    idParaExcluir = id;
    document.getElementById('modal-texto').textContent = `Deseja excluir o professor ID ${id}?`;
    document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
    idParaExcluir = null;
    document.getElementById('modal').style.display = 'none';
}

async function confirmarExclusao() {
    if (!idParaExcluir) return;
    try {
        const resp = await fetch(`${API}/${idParaExcluir}`, { method: 'DELETE' });
        if (!resp.ok) throw new Error('Erro HTTP ' + resp.status);
        fecharModal();
        mostrarMensagemSucesso('Professor excluído com sucesso!');
        carregarProfessores();
    } catch (e) {
        fecharModal();
        alert('Erro ao excluir o professor.');
    }
}

function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('matricula').value = '';
    document.getElementById('disciplina').value = '';
    document.getElementById('observacoes').value = '';
    document.querySelector('input[name="ativo"][value="true"]').checked = true;
    limparErros();
    document.getElementById('msg-erro').style.display = 'none';
}

function limparErros() {
    document.getElementById('err-nome').textContent = '';
    document.getElementById('err-matricula').textContent = '';
    document.getElementById('err-disciplina').textContent = '';
}

function mostrarMensagemSucesso(msg) {
    document.getElementById('msg-sucesso-texto').textContent = msg;
    document.getElementById('msg-sucesso').style.display = 'flex';
}

function fecharMsgSucesso() {
    document.getElementById('msg-sucesso').style.display = 'none';
}
