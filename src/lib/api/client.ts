import type {
  MatchHistoryItem,
  PublicProfile,
  Subject,
  User,
  UserSubjectStats,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface MatchHistoryResponse {
  matches: MatchHistoryItem[];
  total: number;
}

class ApiClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.accessToken) {
      (headers as Record<string, string>).Authorization =
        `Bearer ${this.accessToken}`;
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (response.status === 401 && this.refreshToken) {
        const refreshed = await this.refresh();
        if (refreshed) {
          (headers as Record<string, string>).Authorization =
            `Bearer ${this.accessToken}`;
          const retryResponse = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
          });
          if (!retryResponse.ok) {
            return { error: "Request failed after token refresh" };
          }
          return { data: await retryResponse.json() };
        }
        return { error: "Session expired. Please login again." };
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { error: errorData.message || "Request failed" };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  async refresh(): Promise<boolean> {
    if (!this.refreshToken) return false;

    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      if (!response.ok) {
        this.clearTokens();
        return false;
      }

      const data = await response.json();
      this.setTokens(data.accessToken, data.refreshToken);
      return true;
    } catch {
      this.clearTokens();
      return false;
    }
  }

  async logout(): Promise<void> {
    if (this.refreshToken) {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      }).catch(() => {});
    }
    this.clearTokens();
  }

  // Auth endpoints (no /api/v1 prefix)
  async getMe() {
    return this.request<User>("/auth/me");
  }

  // User endpoints (/api/v1 prefix)
  async getPublicProfile(userId: string) {
    return this.request<PublicProfile>(`/api/v1/users/${userId}`);
  }

  async getPublicProfileByUsername(username: string) {
    return this.request<PublicProfile>(`/api/v1/users/username/${username}`);
  }

  async getUserStats(userId: string) {
    return this.request<UserSubjectStats[]>(`/api/v1/users/${userId}/stats`);
  }

  async updateProfile(data: { username?: string; name?: string }) {
    return this.request<User>("/api/v1/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async getMatchHistory(userId: string, limit = 20, offset = 0) {
    return this.request<MatchHistoryResponse>(
      `/api/v1/users/${userId}/matches?limit=${limit}&offset=${offset}`,
    );
  }

  // Subject endpoints
  async getSubjects() {
    return this.request<Subject[]>("/api/v1/subjects");
  }

  async getSubject(slug: string) {
    return this.request<Subject>(`/api/v1/subjects/${slug}`);
  }

  // Match endpoints
  async getMatch(matchId: string) {
    return this.request<unknown>(`/api/v1/matches/${matchId}`);
  }

  // Generic methods
  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" });
  }

  post<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  patch<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const api = new ApiClient();
export const API_BASE_URL = API_URL;
