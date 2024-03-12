"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getCookie, setCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async () => {
    try {
      if (
        email.length > 0 &&
        password.length > 0 &&
        confirmPassword.length > 0
      ) {
        if (confirmPassword === password) {
          const registerRequest = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
            {
              email,
              password,
            }
          );

          if (registerRequest.status === 200) {
            await setCookie("auth:token", registerRequest.data.data.token);

            toast({
              title: "Login realizado com sucesso",
              description: "Redirecionando para o painel",
              variant: "success",
            });

            setTimeout(() => {
              router.push("/painel");
            }, 1000);
          }
        } else {
          toast({
            variant: "destructive",
            title: "As senhas não são iguais",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Preencha todos os campos",
        });
      }
    } catch (error: any) {
      const errorMessage = !!error?.response?.data?.message
        ? error.response.data.message
        : "";

      toast({
        title: "Erro ao realizar login",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getCookie("auth:token").then((response) => {
      if (response !== undefined) {
        router.push("/painel");
      }
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center flex-col gap-5 h-full w-full container mx-auto">
      <div className="bg-theme-800 p-10 rounded-lg shadow">
        <h1 className="text-2xl font-bold">Registre sua conta</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <div className="flex flex-col mt-2">
            <label className="text-slate-600 uppercase font-bold">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="seuemail@gmail.com"
              className="transition-all outline outline-transparent p-3 border border-slate-600 rounded w-[320px] block mt-1 placeholder:text-slate-600 focus:outline-theme-500 hover:outline-theme-500"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-slate-600 uppercase font-bold">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*************"
              className="transition-all outline outline-transparent p-3 border border-slate-600 rounded w-[320px] block mt-1 placeholder:text-slate-600 focus:outline-theme-500 hover:outline-theme-500"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-slate-600 uppercase font-bold">
              Repita a senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*************"
              className="transition-all outline outline-transparent p-3 border border-slate-600 rounded w-[320px] block mt-1 placeholder:text-slate-600 focus:outline-theme-500 hover:outline-theme-500"
              required
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="mt-5 bg-theme-500 px-5 py-3 rounded text-white font-bold text-lg w-full text-center transition-all hover:bg-theme-600"
          >
            Entrar no Painel
          </button>
        </form>
      </div>
      <p>
        Já possúi uma conta?{" "}
        <Link className="text-theme-500 underline" href="/login">
          Faça login agora mesmo!
        </Link>
      </p>
    </div>
  );
}
