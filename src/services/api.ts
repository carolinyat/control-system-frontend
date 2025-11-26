import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

// Tipos
export interface Sentence {
  id?: number;
  text: string;
  difficulty?: number;
  phase?: number;
}

export interface AnalysisResult {
  success: boolean;
  audio_filename: string;
  transcribed_text: string;
  target_text: string;
  accuracy_percentage: number;
  phonological_tip: string;
  full_analysis: string;
  chatgpt_available: boolean;
  message: string;
}

export interface AttemptScore {
  score: number;
}

export interface PhraseProgress {
  user_id: string;
  sentence_difficulty: string;
  started_at: string;
  ended_at: string;
  attempt_count: number;
  attempts: AttemptScore[];
  best_score: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  msg: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface UserProgress {
  user_id: string;
  sentence_difficulty: string;
  started_at: string;
  ended_at: string;
  attempt_count: number;
  attempts: AttemptScore[];
  best_score: number;
  _id?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

// Função para buscar todas as frases
export const getSentences = async (): Promise<Sentence[]> => {
  // Usando o endpoint correto: enumerate_sentences_get
  const response = await api.get('/sentences/enumerate');
  // Se retornar um objeto, converte para array
  const data = response.data;
  if (Array.isArray(data)) {
    return data;
  }
  // Se for um objeto, pega os valores
  return Object.values(data);
};

// Função para analisar a fala
export const analyzeSpeech = async (audioBlob: Blob, targetText: string): Promise<AnalysisResult> => {
  console.log('📤 Enviando para análise:');
  console.log('- Tipo do áudio:', audioBlob.type);
  console.log('- Tamanho do áudio:', audioBlob.size, 'bytes');
  console.log('- Frase alvo RECEBIDA:', targetText);
  console.log('- Tipo de targetText:', typeof targetText);
  console.log('- targetText é vazio?', targetText === '');
  console.log('- targetText length:', targetText?.length);
  
  if (!targetText || targetText.trim() === '') {
    console.error('❌ ERRO: targetText está vazio na função analyzeSpeech!');
    throw new Error('Texto alvo está vazio');
  }
  
  const formData = new FormData();
  
  // Força o arquivo como WAV, que é suportado pelo backend
  const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
  
  // O backend espera 'target_text' como Form field, não string simples
  formData.append('file', audioFile);
  formData.append('target_text', targetText);
  
  console.log('📦 FormData criado:');
  console.log('- Nome do arquivo:', 'recording.wav');
  console.log('- MIME type:', 'audio/wav');
  console.log('- target_text ANTES de append:', targetText);
  
  // Log para verificar o FormData
  for (let pair of formData.entries()) {
    console.log('- FormData campo:', pair[0], '=', pair[1]);
  }
  
  try {
    const response = await api.post('/ai/analyze-speech', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('✅ Resposta da IA:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Erro na requisição:', error);
    if (error.response) {
      console.error('- Status:', error.response.status);
      console.error('- Dados:', error.response.data);
      throw new Error(error.response.data.detail || 'Erro ao analisar a fala');
    }
    throw error;
  }
};

// Função para salvar o progresso do jogador
export const saveProgress = async (progress: PhraseProgress): Promise<any> => {
  console.log('💾 Salvando progresso:', progress);
  
  try {
    const response = await api.post('/phrase-progress', progress);
    console.log('✅ Progresso salvo com sucesso:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Erro ao salvar progresso:', error);
    if (error.response) {
      console.error('- Status:', error.response.status);
      console.error('- Dados:', error.response.data);
    }
    throw error;
  }
};

// Função para fazer login
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  console.log('🔐 Fazendo login:', email);
  
  try {
    const response = await api.post('/users/login', {
      email,
      password
    });
    console.log('✅ Login bem-sucedido:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Erro no login:', error);
    if (error.response) {
      console.error('- Status:', error.response.status);
      console.error('- Dados:', error.response.data);
    }
    throw error;
  }
};

// Função para buscar o progresso do usuário
export const getUserProgress = async (userId: string): Promise<UserProgress[]> => {
  console.log('📊 Buscando progresso do usuário:', userId);
  
  try {
    const response = await api.get(`/phrase-progress/user/${userId}`);
    console.log('✅ Progresso obtido:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Erro ao buscar progresso:', error);
    if (error.response) {
      console.error('- Status:', error.response.status);
      console.error('- Dados:', error.response.data);
    }
    throw error;
  }
};

// Função para buscar todos os usuários (apenas admin)
export const getUsers = async (): Promise<User[]> => {
  console.log('👥 Buscando lista de usuários');
  
  try {
    const response = await api.get('/users');
    console.log('✅ Usuários obtidos:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Erro ao buscar usuários:', error);
    if (error.response) {
      console.error('- Status:', error.response.status);
      console.error('- Dados:', error.response.data);
    }
    throw error;
  }
};

// Função para registrar novo usuário (apenas admin)
export const registerUser = async (userData: CreateUserRequest): Promise<User> => {
  console.log('➕ Registrando novo usuário:', userData.email);
  
  try {
    const response = await api.post('/users/register', userData);
    console.log('✅ Usuário registrado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Erro ao registrar usuário:', error);
    if (error.response) {
      console.error('- Status:', error.response.status);
      console.error('- Dados:', error.response.data);
    }
    throw error;
  }
};

// Função para buscar dados de um usuário específico
export const getUserById = async (userId: string): Promise<User> => {
  console.log('👤 Buscando dados do usuário:', userId);
  
  try {
    const response = await api.get(`/users/${userId}`);
    console.log('✅ Dados do usuário obtidos:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Erro ao buscar dados do usuário:', error);
    if (error.response) {
      console.error('- Status:', error.response.status);
      console.error('- Dados:', error.response.data);
    }
    throw error;
  }
};

export default api;
