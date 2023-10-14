import { toast } from "@/Components/shadcn/ui/use-toast";
import useStore from "@/store";

export const useLandings = () => {

    const { addLandings } = useStore()

    const getLandings = async () => {
        const data = await window.axios.get(route('landings.index'));
        //addLandings(data);
    }

    return { getLandings }
}