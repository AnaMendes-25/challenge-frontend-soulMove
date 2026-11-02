import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { contaSchema } from '../../../types/contaSchema';
import type { ContaFormData } from '../../../types/contaSchema';
import { usuariosService } from '../../../services/usuariosService';
import type { Usuario } from '../../../services/usuariosTypes';
import ButtonBase from '../../../components/ButtonBase/ButtonBase';
import ModalSucesso from '../../../components/ModalSucesso/ModalSucesso';

export const ContaConfiguracoes: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [usuarioAtual, setUsuarioAtual] = useState<Usuario | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<ContaFormData>({
        resolver: zodResolver(contaSchema),
        defaultValues: {
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
        },
    });

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

    // 2. Ação do botão Cancelar (restaura os dados originais)
    const handleCancelar = () => {
        if (usuarioAtual) {
            reset({
                nome: usuarioAtual.nome,
                email: usuarioAtual.email,
                senha: '',
                confirmarSenha: '',
            });
            setErrorMessage(null);
            setSuccessMessage(null);
        }
    };

    // 3. Submissão das alterações (envia para o backend)
    const onSubmit = async (data: ContaFormData) => {
        if (!usuarioAtual) return;

        setSaving(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const payload = {
                nome: data.nome,
                email: data.email,
                fotoUsuario: usuarioAtual.fotoUsuario,
                ...(data.senha ? { senha: data.senha } : {}),
            };

            const usuarioAtualizado = await usuariosService.atualizarPerfil(usuarioAtual.id, payload);

            setUsuarioAtual(usuarioAtualizado);
            reset({
                nome: usuarioAtualizado.nome,
                email: usuarioAtualizado.email,
                senha: '',
                confirmarSenha: '',
            });
            setSuccessMessage('Alterações guardadas com sucesso!');
            setIsModalOpen(true);
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <p className="text-gray-400 font-medium">A carregar dados da conta...</p>
            </div>
        );
    }

    return (
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

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Nova senha</label>
                            <input
                                type="password"
                                {...register('senha')}
                                placeholder="Digite uma nova senha"
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                            />
                            {errors.senha && <p className="text-xs text-red-500 mt-1">{errors.senha.message}</p>}
                            <p className="text-[11px] text-gray-400 mt-1">Ao menos 8 caracteres, com letras e números.</p>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Confirmar nova senha</label>
                            <input
                                type="password"
                                {...register('confirmarSenha')}
                                placeholder="Repita a nova senha"
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                            />
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
                            onClick={handleCancelar}
                            disabled={saving || !isDirty}
                        >
                            Cancelar
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
            </div>

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
    );
};