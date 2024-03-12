import { cache } from "react";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { revalidateAdminPanel, revalidatePanel } from "./actions";

export const revalidate = 30;

export type IAllApprovedGroupsRequest = {
  status: number;
  message: string;
  data: IGroupOptions[];
};

export interface IGroupOptions {
  id: number;
  title: string;
  description: string;
  link: string;
  stApproved: boolean;
  categoryId: number;
  userIdApproved: number;
  userIdCreated: number;
  bannerImage: string;
  type: string;
  slug: string;
  impulse: boolean;
  impulse_end_date: string
}

export const getHomeAllApprovedGroups = cache(async () => {
  const groupsRequest = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/list/all?approved=true&limit=4`,
    {
      next: { tags: ["groups"] },
    }
  );

  const groups: IAllApprovedGroupsRequest = await groupsRequest.json();

  return groups.data;
});

export const getAllApprovedGroups = cache(async () => {
  const groupsRequest = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/list/all?approved=true`
  );

  const groups: IAllApprovedGroupsRequest = await groupsRequest.data;

  return groups.data;
});

export const getSearchGroups = cache(async (search_term: string) => {
  const groupsRequest = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/search?text=${search_term}`
  );

  const groups: IAllApprovedGroupsRequest = await groupsRequest.data;

  return groups.data;
})

export const getAllImpulsedGroups = cache(async () => {
  const groupsRequest = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/list/all?impulse=true`
  );

  const groups: IAllApprovedGroupsRequest = await groupsRequest.data;

  return groups.data;
});

export const getAllReprovedGroups = cache(async () => {
  const groupsRequest = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/list/all?approved=false`
  );

  const groups: IAllApprovedGroupsRequest = await groupsRequest.data;

  return groups.data;
});

export const getOneGroup = cache(async (slug: string) => {
  const groupsRequest = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/list/${slug}`
  );

  const groups: {
    status: number;
    message: string;
    data: IGroupOptions;
  } = await groupsRequest.data;

  return groups.data;
});
export const getOneCategoryGroups = cache(async (categoryid: number) => {
  const groupsRequest = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/list/all?approved=true&categoryId=${categoryid}`
  );

  const groups: IAllApprovedGroupsRequest = await groupsRequest.data;

  return groups.data;
});


export const createOneGroup = async (
  title: string,
  link: string,
  categoryId: number,
  groupDescriptions: string,
  groupBannerLink: string,
  type: string,
  token: string
) => {
  const groupsRequest = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/create`,
    {
      title,
      link,
      categoryId,
      description: groupDescriptions,
      banner_image: groupBannerLink,
      type,
    },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  revalidatePanel();

  return groupsRequest;
};

export const createImpulseCheckout = async (group_id: number, plan_id: number, token: string) => {
  const groupsRequest = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/impulse`,
    {
      plan_id,
      group_id
    },
    {
      headers: { Authorization: "Bearer " + token },
    }
  )

  revalidatePanel()

  return groupsRequest.data
}
export const updateOneGroup = async (
  id: number,
  newData: any,
  token: string
) => {
  const groupsRequest = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/update/${id}`,
    newData,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  revalidateAdminPanel();

  return groupsRequest;
};

export const deleteOneGroup = async (id: number, token: string) => {
  const groupsRequest = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/groups/delete/${id}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  revalidateAdminPanel();

  return groupsRequest;
};
