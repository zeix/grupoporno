import { getCookie } from "@/lib/cookies";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSettings } from "@/functions/settings";
import { InputSetting } from "@/components/panel/InputSetting";
import ImageArea from "@/components/ui/imagearea";

export const metadata = {
  title: "Admin",
};

export default async function AdminPanelPage() {
  const token = await getCookie("auth:token");
  const settings = await getSettings();

  return (
    <div className="container">
      <Tabs defaultValue="general" className="flex gap-10 py-10">
        <TabsList className="max-w-lg w-full p-10 py-36 rounded-lg bg-theme-800 flex flex-col gap-5">
          <TabsTrigger
            value="general"
            className="w-full text-2xl border bg-theme-900"
          >
            Gerais
          </TabsTrigger>
          <TabsTrigger
            value="colors"
            className="w-full text-2xl border bg-theme-900"
          >
            Cores
          </TabsTrigger>
          <TabsTrigger
            value="texts"
            className="w-full text-2xl border bg-theme-900"
          >
            Páginas
          </TabsTrigger>
        </TabsList>
        <div className="w-full p-10 rounded-lg bg-theme-800 h-fit">
          <TabsContent value="general" className="flex flex-col gap-5">
            <InputSetting
              title="Título do site"
              setting="meta_title"
              inputType="text"
              defaultValue={settings.meta_title}
              placeholder="Título do site"
              token={token?.value || ""}
            />
             <InputSetting
              title="Placeholder Barra de Pesquisa"
              setting="placeholder_search_bar"
              inputType="text"
              defaultValue={settings.placeholder_search_bar}
              placeholder="Buscar grupo | canal"
              token={token?.value || ""}
            />
            <InputSetting
              title="Descrição do site"
              setting="meta_description"
              inputType="text"
              defaultValue={settings.meta_description}
              placeholder="Descrição do site"
              token={token?.value || ""}
            />
            <InputSetting
              title="Keywords"
              setting="meta_keywords"
              inputType="text"
              defaultValue={settings.meta_keywords}
              placeholder="Keywords do site"
              token={token?.value || ""}
            />
            <InputSetting
              title="Link da logo"
              setting="url_image"
              inputType="text"
              defaultValue={settings.url_image}
              placeholder="Url da logo"
              token={token?.value || ""}
            />
            {/* <ImageArea /> */}
          </TabsContent>
          <TabsContent value="colors" className="flex flex-col gap-5">
            <InputSetting
              title="Cor principal"
              setting="main_color"
              inputType="color"
              defaultValue={settings.main_color}
              placeholder="Cor principal do site"
              token={token?.value || ""}
            />
            <InputSetting
              title="Cor secundária"
              setting="secondary_color"
              inputType="color"
              defaultValue={settings.secondary_color}
              placeholder="Cor secundária do site"
              token={token?.value || ""}
            />
            <InputSetting
              title="Fundo principal"
              setting="bg_first"
              inputType="color"
              defaultValue={settings.bg_first}
              placeholder="Fundo principal do site"
              token={token?.value || ""}
            />
            <InputSetting
              title="Fundo Secundário"
              setting="bg_secondary"
              inputType="color"
              defaultValue={settings.bg_secondary}
              placeholder="Fundo secundário do site"
              token={token?.value || ""}
            />
            <InputSetting
              title="Cor do texto"
              setting="text_color"
              inputType="color"
              defaultValue={settings.text_color}
              placeholder="Cor de texto do site"
              token={token?.value || ""}
            />
          </TabsContent>
          <TabsContent value="texts" className="flex flex-col gap-5">
            <InputSetting
              title="Título headline"
              setting="home_title"
              inputType="text"
              defaultValue={settings.home_title}
              placeholder="Título do site"
              token={token?.value || ""}
            />
            <InputSetting
              title="Texto headline"
              setting="home_description"
              inputType="text"
              defaultValue={settings.home_description}
              placeholder="Descrição do site"
              token={token?.value || ""}
            />
            <InputSetting
              title="Imagem headline"
              setting="home_description"
              inputType="text"
              defaultValue={settings.home_bg_url}
              placeholder="Imagem headline do site"
              token={token?.value || ""}
            />
            <InputSetting
              title="Chave do Recaptcha"
              setting="recaptcha_key"
              inputType="text"
              defaultValue={settings.recaptcha_key}
              placeholder="Recaptcha Key"
              token={token?.value || ""}
            />
            <InputSetting
              title="Título da seção de categorias"
              setting="home_category_title"
              inputType="text"
              defaultValue={settings.home_category_title}
              placeholder="Título da seção de categorias"
              token={token?.value || ""}
            />
            <InputSetting
              title="Descrição da seção de categorias"
              setting="home_category_desc"
              inputType="text"
              defaultValue={settings.home_category_desc}
              placeholder="Descrição da seção de categorias"
              token={token?.value || ""}
            />
            <InputSetting
              title="Título da seção de grupos"
              setting="home_groups_title"
              inputType="text"
              defaultValue={settings.home_groups_title}
              placeholder="Título da seção de grupos"
              token={token?.value || ""}
            />
            <InputSetting
              title="Descrição da seção de grupos"
              setting="home_groups_desc"
              inputType="text"
              defaultValue={settings.home_groups_desc}
              placeholder="Descrição da seção de grupos"
              token={token?.value || ""}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
