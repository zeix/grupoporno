import { cache } from "react";
import axios from "axios";
import { revalidateAdminPanel } from "./actions";

export type ISettingsRequestOptions = {
  status: number;
  message: string;
  data: ISettingsOptions;
};

export type ISettingsOptions = {
  bg_first: string;
  bg_secondary: string;
  url_image: string;
  main_color: string;
  secondary_color: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  text_color: string;
  home_title: string;
  placeholder_search_bar: string;
  home_description: string;
  home_bg_url: string;
  home_category_title: string;
  home_category_desc: string;
  home_groups_title: string;
  home_groups_desc: string;
};

export const revalidate = 30;
let cachedSettings: ISettingsOptions | null = null;
export const getSettings = async () => {
  if (cachedSettings) {
    return cachedSettings;
  }

  const settingsRequest = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/settings/list/all`
  );

  const settings: ISettingsRequestOptions = settingsRequest.data;
  cachedSettings = settings.data;

  return cachedSettings;
};
export const updateSetting = async (
  name: string,
  newValue: string,
  token: string
) => {
  const settingsRequest = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/settings/patch`,
    { option: name, valOption: newValue },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  revalidateAdminPanel();

  return settingsRequest;
};
