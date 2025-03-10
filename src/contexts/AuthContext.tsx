import React, { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "@/services/apiClient";


interface AuthContextData {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<void>;
    logoutUser: () => Promise<void>
}

interface UserProps {
    id: string;
    name: string;
    email: string;
    endereco: string | null;
    subscriptions?: SubsProps | null
}

interface SubsProps {
    id: string;
    status: string;
}

type AuthProviderProps = {
    children: ReactNode
}

interface SignInProps {
    email: string
    password: string
}


interface SignUpProps {
    name: string
    email: string
    password: string
}


export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(null, "@barber.token", { path: "/" })
        Router.push("/login")
    } catch (err) {
        console.log("Erro ao sair")
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    useEffect(() => {
        const { '@barber.token': token } = parseCookies()
        if (token) {
            api.get('/me').then(response => {
                const { id, name, endereco, email, subscriptions } = response.data
                setUser({
                    email, endereco, id, name, subscriptions
                })
            })
                .catch(() => {
                    signOut()
                })
        }
    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/session", {
                email,
                password
            })
            const { id, name, token, subscriptions, endereco } = response.data;

            setCookie(undefined, '@barber.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })
            setUser({
                email, endereco, id, name, subscriptions
            })

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            Router.push("/dashboard")

        } catch (err) {
            console.log("Erro ao entrar")
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {

            const response = await api.post("/users", {
                name, email, password
            })

            Router.push("/login")

        } catch (error) {
            console.log(error)
        }
    }
    async function logoutUser() {
        try {
            destroyCookie(null, '@barber.token', {
                path: '/'
            })
            Router.push("/login")
            setUser(null)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, logoutUser, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}