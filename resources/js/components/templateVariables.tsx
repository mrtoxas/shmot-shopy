import useLandingsStore from "@/store/landingsStore";
import { Textarea } from "./shadcn/ui/textarea";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "./shadcn/ui/button";
import { CopyIcon } from "./ui/icons";

export const TemplateVariables = () => {
  const [data, setData] = useState<App.Models.LandingTemplate>();
  const [isCopy, setIsCopy] = useState(false);
  const { currentLanding, templates } = useLandingsStore();

  useEffect(()=>{
    const actualTemplate = templates.find((e) => e.id === currentLanding?.landing_settings?.template_id);
    const variables = actualTemplate?.css_vars;
    setData(variables);
    //
  },[templates, currentLanding?.landing_settings?.template_id])  

  const copyToClipboard = useCallback(()=>{
    if (!data) return;
    navigator.clipboard.writeText(String(data));
    setIsCopy(true);
  },[data])

  const preparedField = useMemo(()=>{
    if (!data) return;
    return JSON.stringify(JSON.parse(String(data)), undefined, 2)
  },[data])

  return (
    <>
      <Textarea
        className="min-h-[120px]"
        value={preparedField}
        placeholder="Type your message here." 
        readOnly
        autoFocus={false}
      />
      <div>
        <Button onClick={copyToClipboard} type="button" title="Скопіювати в буфер обміну" className="mt-2">
          <CopyIcon className="h-4 w-4 mr-2" /> {!isCopy ? 'Копіювати' : 'Скопійовано!'}
        </Button>
      </div>      
    </>
  )
}