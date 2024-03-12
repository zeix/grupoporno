// @ts-ignore
type IUserOptions = {
  id: number;
  email: string;
  role: number;
};

export interface IGetAllUsers {
  status: number;
  message: string;
  data: IUserOptions[]
}
import { getCookie } from "@/lib/cookies";

export const metadata = {
  title: "Admin",
};

export const getAllUsers = async (token: string): Promise<IGetAllUsers> => {
  const usersRequest = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/list/all?page=1&pagesize=10`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  console.log(usersRequest)
  const groups: IGetAllUsers = await usersRequest.json() as any;

  return groups;
}
export default async function AdminPanelPage() {
  const token = await getCookie("auth:token");
  const users = await getAllUsers(token?.value || '') as any;

  return (
    <div className="container">
      <div className="grid py-10 gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {users && users.data.map((user: any) => {
          return (
            <div
              key={user.id}
              className="bg-theme-800 p-10 rounded-lg h-fit flex items-center justify-between"
            >
              <div className="">
                <h1 className="text-sm text-theme-500 font-bold">
                  {user.email}
                </h1>
              </div>
              <div className="flex gap-2">
{/*       
                 <DeleteUserDialog group={user as any} token={token?.value}>
                  <button>
                    <Trash color="#e65555" />
                  </button>
                </DeleteUserDialog> */}
              </div> 
            </div>
          );
        })}
      </div>
      {users.data.length === 0 && (
        <h1 className="text-2xl w-full text-center font-bold mb-20">
          Nenhum Usuario Existente
        </h1>
      )}
    </div>
  );
}
