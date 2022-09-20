import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/session";

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    if(!session.has('token')) return redirect('/login');
}