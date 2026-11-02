import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import { contaSchema } from '../../../types/contaSchema';
import type { ContaFormData } from '../../../types/contaSchema';
import { usuariosService } from '../../../services/usuariosService';
import type { Usuario } from '../../../services/usuariosTypes';
import ButtonBase from '../../../components/ButtonBase/ButtonBase';
import ModalSucesso from '../../../components/ModalSucesso/ModalSucesso';
import AsideBar from '../../../components/AsideBar/AsideBar';

export const ContaConfiguracoes: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [usuarioAtual, setUsuarioAtual] = useState<Usuario | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isDirty },
    } = useForm<ContaFormData>({
        resolver: zodResolver(contaSchema),
        defaultValues: {
            nome: '',
            email: '',
            fotoUsuario: '',
            senha: '',
            confirmarSenha: '',
        },
    });
    const fotoPreview = watch('fotoUsuario');

    // 1. Carregamento dos dados da sessão autenticada
    useEffect(() => {
        const carregarUsuario = async () => {
            const idGuardado = usuariosService.getUsuarioIdGuardado();

            if (!idGuardado) {
                setErrorMessage('Sessão expirada. A redirecionar...');
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            try {
                setLoading(true);
                const dados = await usuariosService.buscarPorId(idGuardado);
                setUsuarioAtual(dados);
                reset({
                    nome: dados.nome,
                    email: dados.email,
                    fotoUsuario: dados.fotoUsuario ?? '',
                    senha: '',
                    confirmarSenha: '',
                });
            } catch {
                setErrorMessage('Erro ao carregar as informações do utilizador.');
            } finally {
                setLoading(false);
            }
        };

        carregarUsuario();
    }, [reset, navigate]);

    // 2. Submissão das alterações (envia para o backend)
    const onSubmit = async (data: ContaFormData) => {
        if (!usuarioAtual) return;

        setSaving(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const payload = {
                nome: data.nome,
                email: data.email,
                fotoUsuario: data.fotoUsuario?.trim() || null,
                ...(data.senha ? { senha: data.senha } : {}),
            };

            const usuarioAtualizado = await usuariosService.atualizarPerfil(usuarioAtual.id, payload);

            setUsuarioAtual(usuarioAtualizado);
            reset({
                nome: usuarioAtualizado.nome,
                email: usuarioAtualizado.email,
                fotoUsuario: usuarioAtualizado.fotoUsuario ?? '',
                senha: '',
                confirmarSenha: '',
            });
            window.dispatchEvent(new CustomEvent<Usuario>('usuario:atualizado', { detail: usuarioAtualizado }));
            setSuccessMessage('Alterações guardadas com sucesso!');
            setIsModalOpen(true);
            navigate('/metricas');
        } catch (err: unknown) {
            const errorObj = err as { status?: number; message?: string };

            if (errorObj?.status === 409) {
                setErrorMessage('O e-mail informado já está registado noutra conta.');
            } else {
                setErrorMessage(errorObj?.message || 'Falha ao atualizar o perfil. Tente novamente.');
            }
        } finally {
            setSaving(false);
        }
    };

    const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const arquivo = event.target.files?.[0];
        if (!arquivo) return;

        if (!arquivo.type.startsWith('image/')) {
            setErrorMessage('Selecione um arquivo de imagem válido.');
            event.target.value = '';
            return;
        }

        const leitor = new FileReader();
        leitor.onload = () => {
            if (typeof leitor.result !== 'string') {
                setErrorMessage('Não foi possível converter a imagem selecionada.');
                return;
            }

            setValue('fotoUsuario', leitor.result, { shouldDirty: true, shouldValidate: true });
            setErrorMessage(null);
        };
        leitor.onerror = () => setErrorMessage('Não foi possível ler a imagem selecionada.');
        leitor.readAsDataURL(arquivo);
    };

    const handleExcluirConta = () => {
        if (!usuarioAtual) return;
        setIsDeleteModalOpen(true);
    };

    const confirmarExclusaoConta = async () => {
        if (!usuarioAtual) return;

        setSaving(true);
        setErrorMessage(null);
        setIsDeleteModalOpen(false);

        try {
            await usuariosService.excluirConta(usuarioAtual.id);
            navigate('/login', { replace: true });
        } catch (err: unknown) {
            const errorObj = err as { message?: string };
            setErrorMessage(errorObj?.message || 'Não foi possível excluir a conta. Tente novamente.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <>
                <AsideBar />
                <main className="min-h-dvh pb-24 md:ml-24 md:pb-0">
                    <div className="flex justify-center items-center min-h-100">
                        <p className="text-gray-400 font-medium">A carregar dados da conta...</p>
                    </div>
                </main>
            </>
        );
    }

return (
    <>
        <AsideBar />
        <main className="min-h-dvh pb-24 md:ml-24 md:pb-0">
            <div className="max-w-3xl mx-auto p-6 text-gray-900">
                {/* Cabeçalho conforme Figma */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
                    <p className="text-sm text-gray-500">Cuide dos seus dados e da segurança da sua conta.</p>
                </div>

                {/* Cartão de Conteúdo Principal */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-1">Minha conta</h2>
                        <p className="text-xs text-gray-500 mb-6">
                            Gerencie suas informações pessoais e a segurança da sua conta.
                        </p>
                    </div>

                    {errorMessage && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {errorMessage}
                        </div>
                    )}

                    {successMessage && (
                        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Informações Pessoais */}
                        <section className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-800">Informações pessoais</h3>

                            {/* Foto do usuário no topo */}
                            <div>
                                <span className="block text-xs font-medium text-gray-700 mb-2">Foto do usuário</span>
                                <label
                                    htmlFor="fotoUsuario"
                                    className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 text-center text-xs text-gray-500 transition-colors hover:border-blue-600 hover:bg-blue-50"
                                    title="Selecionar foto do usuário"
                                >
                                    {fotoPreview ? (
                                        <img src={fotoPreview} alt="Prévia da foto do usuário" className="h-full w-full object-cover" />
                                    ) : (
                                        <FiUser className="h-10 w-10 text-gray-400" strokeWidth={1.5} aria-hidden="true" />
                                    )}
                                </label>
                                <input
                                    id="fotoUsuario"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFotoChange}
                                    className="sr-only"
                                />
                                {errors.fotoUsuario && (
                                    <p className="text-xs text-red-500 mt-1">{errors.fotoUsuario.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Nome completo</label>
                                <input
                                    type="text"
                                    {...register('nome')}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                />
                                {errors.nome && <p className="text-xs text-red-500 mt-1">{errors.nome.message}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">E-mail</label>
                                <input
                                    type="email"
                                    {...register('email')}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                />
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                            </div>
                        </section>

                        {/* Alterar Senha */}
                        <section className="space-y-4 pt-2">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">Alterar senha</h3>
                                <p className="text-xs text-gray-500">Preencha apenas se quiser definir uma nova senha.</p>
                            </div>

                            {/* Nova senha com visualização */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Nova senha</label>
                                <div className="relative">
                                    <input
                                        type={mostrarSenha ? "text" : "password"}
                                        {...register('senha')}
                                        placeholder="Digite uma nova senha"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 pr-10 text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setMostrarSenha((visivel) => !visivel)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                        aria-label={mostrarSenha ? 'Ocultar nova senha' : 'Mostrar nova senha'}
                                        aria-pressed={mostrarSenha}
                                    >
                                        {mostrarSenha ? (
                                            <FiEyeOff aria-hidden="true" />
                                        ) : (
                                            <FiEye aria-hidden="true" />
                                        )}
                                    </button>
                                </div>
                                {errors.senha && <p className="text-xs text-red-500 mt-1">{errors.senha.message}</p>}
                                <p className="text-[11px] text-gray-400 mt-1">Ao menos 8 caracteres, com letras e números.</p>
                            </div>

                            {/* Confirmar nova senha com visualização */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Confirmar nova senha</label>
                                <div className="relative">
                                    <input
                                        type={mostrarConfirmarSenha ? "text" : "password"}
                                        {...register('confirmarSenha')}
                                        placeholder="Repita a nova senha"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 pr-10 text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setMostrarConfirmarSenha((visivel) => !visivel)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                        aria-label={
                                            mostrarConfirmarSenha
                                                ? 'Ocultar confirmação da nova senha'
                                                : 'Mostrar confirmação da nova senha'
                                        }
                                        aria-pressed={mostrarConfirmarSenha}
                                    >
                                        {mostrarConfirmarSenha ? (
                                            <FiEyeOff aria-hidden="true" />
                                        ) : (
                                            <FiEye aria-hidden="true" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmarSenha && (
                                    <p className="text-xs text-red-500 mt-1">{errors.confirmarSenha.message}</p>
                                )}
                            </div>
                        </section>

                        {/* Botões de Ação utilizando ButtonBase */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <ButtonBase
                                type="button"
                                variant="secondary"
                                onClick={() => navigate('/metricas')}
                                disabled={saving}
                                className="hover:bg-red-50 hover:text-red-600 hover:outline-red-600"
                            >
                                Voltar
                            </ButtonBase>

                            <ButtonBase
                                type="submit"
                                variant="primary"
                                disabled={saving || !isDirty}
                            >
                                {saving ? 'A guardar...' : 'Salvar alterações'}
                            </ButtonBase>
                        </div>
                    </form>

                        <section className="border-t border-red-100 pt-5">
                            <h3 className="text-sm font-semibold text-red-700">Excluir conta</h3>
                            <p className="mt-1 text-xs text-gray-500">
                                Esta ação remove permanentemente sua conta e não pode ser desfeita.
                            </p>
                            <ButtonBase
                                type="button"
                                variant="secondary"
                                onClick={handleExcluirConta}
                                disabled={saving}
                                className="mt-3 text-red-600 outline-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                                {saving ? 'A processar...' : 'Excluir minha conta'}
                            </ButtonBase>
                        </section>
                </div>

                {isDeleteModalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-5"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-exclusao-conta"
                    >
                        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-red-100 text-2xl text-red-600">
                                !
                            </div>
                            <h2 id="titulo-exclusao-conta" className="text-center text-xl font-bold text-gray-900">
                                Excluir sua conta?
                            </h2>
                            <p className="mt-3 text-center text-sm leading-relaxed text-gray-600">
                                Ao excluir sua conta, você perderá todos os seus pontos e dados.
                                Esta ação é irreversível.
                            </p>
                            <div className="mt-6 flex justify-end gap-3">
                                <ButtonBase
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="hover:bg-gray-100"
                                >
                                    Cancelar
                                </ButtonBase>
                                <ButtonBase
                                    type="button"
                                    variant="secondary"
                                    onClick={confirmarExclusaoConta}
                                    className="text-red-600 outline-red-600 hover:bg-red-600 hover:text-white"
                                >
                                    Excluir conta
                                </ButtonBase>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de Sucesso */}
                {isModalOpen && (
                    <ModalSucesso
                        aberto={isModalOpen}
                        titulo="Alterações salvas!"
                        texto="Seus dados de perfil foram atualizados com sucesso."
                        fecharModal={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </main>
    </>
);
};