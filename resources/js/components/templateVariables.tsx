import useLandingsStore from "@/store/landingsStore";
import { Textarea } from "./shadcn/ui/textarea";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "./shadcn/ui/button";
import { CopyIcon } from "./ui/icons";

export const TemplateVariables = ({templateName}: {templateName: string}) => {
  const [data, setData] = useState<string>();
  const [isCopy, setIsCopy] = useState(false);
  const { currentLanding, templates } = useLandingsStore();

  useEffect(()=>{
    const actualTemplate = templates.find((e) => e.name === templateName); 
    if(!actualTemplate) return;
    
    const prepareddata = JSON.stringify(actualTemplate.variables);
    setData(prepareddata);
  },[templates, currentLanding?.landing_settings?.template_name])  

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