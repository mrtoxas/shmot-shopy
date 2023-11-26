import { useMemo, useState, useEffect } from 'react';
import useLandingsStore from "@/store/landingsStore";
import { usePage } from "@inertiajs/react";
import { toast } from "@/components/shadcn/ui/use-toast";
import { useLoader } from '@/hooks/useLoading';
import { Input } from '@/components/shadcn/ui/input';
import { Button } from "@/components/shadcn/ui/button"

export const ThemeVariablesForm = () => {
	const { landingId } = usePage().props;
  const { startLoading, stopLoading, isLoading } = useLoader();
  const { currentLanding, templates } = useLandingsStore();
  const [variables, setVariables] = useState<App.Models.LandingSettings.template_settings>([]);

  useEffect(()=>{
  	const userTemplate = currentLanding?.landing_settings?.template_name;
  	const userVariables = currentLanding?.landing_settings?.template_settings;
  	const templateVariables = templates.find(item => item.name === userTemplate)?.variables;

  	if(!userTemplate && !userVariables && !templateVariables) return;

  	setVariables(JSON.parse(userVariables || templateVariables));
  },[
	  	currentLanding?.landing_settings?.template_name,
	  	currentLanding?.landing_settings?.template_settings,
	  	templates
  	]);

  const handleOnChange = (e) => {
  	const target = e.target;
  	const {name: key, value} = target;
  	setVariables((prevState) => ({...prevState, [key]: value}));
  }

  const preparedData = useMemo(()=>{
  	if (!variables) return;

  	const prepared = Object.keys(variables).reduce((acc, curr) => {
  		if (curr.split("-")[0] === 'color') acc?.colors?.push(
  			<div className="border flex items-center justify-between p-2 rounded-sm">
  				<label htmlFor={curr} className="text-sm font-medium pr-2">{curr}</label>
  				<div>
  					<input type="color" name={curr} value={variables[curr]} id={curr} onChange={handleOnChange} />
  				</div>
  			</div>
  		)
  		if (curr.split("-")[0] === 'size') acc?.sizes?.push(
  			<div>
  				<label htmlFor={curr} className="text-sm font-medium pr-2 mb-2">{curr}:</label>
  				<Input id={curr} name={curr} type="text" value={variables[curr]} onChange={handleOnChange} />
  			</div>
  		)
  		return acc;
  	},{colors: [], sizes: []});

  	return Object.keys(prepared).map((item, index) => (
  		<div key={index} className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
  			{prepared[item].map((e, i) => {
  				return {...e, key: i};
  			})}
  		</div>))
		},[variables]);

  return(
  	<>
  		<div className="grid gap-4">{preparedData}</div>
  		<div className="pt-4 flex gap-2 justify-between">
  			<Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Зберегти</Button>
        <Button type="submit" disabled={isLoading} variant="link">
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Повернути значення шаблону</Button>
  		</div>
  		
  	</>
  )
}

//