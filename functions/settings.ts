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

const CACHE_KEY = "settingsCache";
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes in milliseconds

export const getSettings = async () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_EXPIRY) {
      return data;
    }
  }

  const settingsRequest = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/settings/list/all`
  );

  const settings: ISettingsRequestOptions = settingsRequest.data;
  const data = settings.data;

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );

  return data;
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
