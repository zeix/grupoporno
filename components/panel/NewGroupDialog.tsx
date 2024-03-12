"use client";

import { ReactNode, useEffect, useState } from "react";

import { ICategoryOptions } from "@/functions/categories";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "../ui/use-toast";
import { createOneGroup } from "@/functions/groups";
import { getCookie } from "@/lib/cookies";
import { DialogClose } from "@radix-ui/react-dialog";
import { Textarea } from "../ui/textarea";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import obterInfoGrupo from "@/functions/obterinfoGrupo";

export const NewGroupDialog = ({
  children,
  categories,
}: {
  children: ReactNode;
  categories: ICategoryOptions[];
}) => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState<null | string>(null);
  const [groupLink, setGroupLink] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupBannerImage, setGroupBannerImage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(groupLink)
    const obter = async ()  => {
      const dataGrupo = await obterInfoGrupo(groupLink)

      console.log('dados do grupo', dataGrupo)
    } 

    obter()

  }, [groupLink])
  

  const validateForm = (): boolean => {
    if (title.length === 0) {
      toast({
        title: "Preencha o título do grupo",
        variant: "destructive",
      });

      return false;
    }

    if (groupLink.length === 0) {
      toast({
        title: "Preencha o link do grupo",
        variant: "destructive",
      });

      return false;
    }

    if (categoryId?.length === 0 || !categoryId) {
      toast({
        title: "Selecione uma categoria",
        variant: "destructive",
      });

      return false;
    }

    if (groupBannerImage.length === 0 || !groupBannerImage) {
      toast({
        title: "Digite um link de imagem",
        variant: "destructive",
      });

      return false;
    }

    if (type.length === 0 || !type) {
      toast({
        title: "Escolha um tipo",
        variant: "destructive",
      });

      return false;
    }

    if (groupDescription.length === 0 || !groupDescription) {
      toast({
        title: "Digite uma descrição",
        variant: "destructive",
      });

      return false;
    }

    return true;
  };

  const handleCreateNewGroup = async () => {
    console.log(validateForm());

    if (validateForm()) {
      setLoading(true);

      const token = await getCookie("auth:token");

      createOneGroup(
        title,
        groupLink,
        categories.find((category) => category.title === categoryId)?.id || 0,
        groupDescription,
        groupBannerImage,
        type,
        token?.value || ""
      )
        .then((response) => {
          console.log(response);

          if (response.status === 200) {
            toast({
              title: "Grupo criado com sucesso",
              variant: "success",
            });
          }
        })
        .catch((error) => {
          toast({
            title: "Erro ao criar grupo",
            description: error.response.data.message,
            variant: "destructive",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[760px] w-full rounded-lg shadow">
        <DialogHeader>
          <DialogTitle>Criar grupo</DialogTitle>
          <DialogDescription>
            Preencha as informações corretamente!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome do grupo
            </Label>
            <Input
              id="name"
              placeholder="Grupo do telegram"
              className="col-span-3"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Slug do grupo
            </Label>
            <Input
              id="name"
              placeholder="Slug do grupo"
              className="col-span-3"
              value={title
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9]/g, "-")
                .toLowerCase()}
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Link do Grupo
            </Label>
            <Input
              id="username"
              placeholder="https://example.com/seugrupo"
              className="col-span-3"
              onChange={(e) => 
                {
                  setGroupLink(e.target.value)
                }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Link da imagem
            </Label>
            <Input
              id="username"
              placeholder="https://img.com/img.png"
              className="col-span-3"
              onChange={(e) => setGroupBannerImage(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Descrição do grupo
            </Label>
            <ReactQuill
              className="col-span-3"
              theme="snow"
              value={groupDescription}
              onChange={setGroupDescription}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Categoria
            </Label>
            <Select onValueChange={(e) => setCategoryId(e)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Escolha a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => {
                  return (
                    <SelectItem key={category.id} value={category.title}>
                      {category.title}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Tipo
            </Label>
            <Select onValueChange={(e) => setType(e)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Escolha o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="channel">Canal</SelectItem>
                <SelectItem value="group">Grupo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={handleCreateNewGroup}>
              Enviar grupo
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
