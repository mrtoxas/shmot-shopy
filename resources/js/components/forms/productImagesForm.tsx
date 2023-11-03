import { useMemo, useState, useCallback, useEffect } from 'react';
import { usePage } from "@inertiajs/react";
import { PlusIcon, Trash2Icon } from '@/components/ui/icons';
import { ProductImage } from '@/components/ui/productImage';
import { Button } from "@/components/shadcn/ui/button";
import useLandingsStore from "@/store/landingsStore";
import { toast } from "../shadcn/ui/use-toast"


interface StateProductImage extends App.Models.ProductImage {
	file: File;
}

export const ProductImagesForm = () => {
	const [imgList, setImgList] = useState<StateProductImage[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { currentProduct, updateProductImages } = useLandingsStore();
	const { landingId, productId } = usePage().props;

	useEffect(()=>{
		if (!currentProduct?.product_images) return;

		setImgList(currentProduct.product_images);
	},[currentProduct?.product_images])

	const handleImageUpload = (event) => {
		const selectedImages = Array.from(event.target.files);
		
		selectedImages.map((file, index) => {
			const imageUrl = URL.createObjectURL(file);
			setImgList((prevState) => {
    		return [...prevState, { img_name: imageUrl, file: file }];
			})
		})
	}

	const handleImageRemove = (index: string) => {
		setImgList((prevState) => prevState.filter((_, i) => i !== index));
	}

	const handleSubmit = useCallback(() => {
		const formData = new FormData();
		imgList.forEach((data, index) => {
    	formData.append(`images[${index}]`, data.file);
  	});

  	return updateProductImages(
      Number(landingId), 
      Number(productId), 
      formData).then((res) => {
    toast({
      className: "bg-green-600 text-white",
      title: "Успіх!",
      description: res.data.message,
    })
  })
	}, [imgList]);

	const preparedImgList = useMemo(() => {
		return imgList?.map((el, index) => {
			const imgLink = el.id 
				? `${window.location.protocol}//${window.location.hostname}/storage/${el.img_name}`
				: el.img_name;
			return (
				<div key={index} className="w-32 h-32 relative">
				<img src={imgLink} className="block w-full h-full object-cover" />
					<div onClick={() => handleImageRemove(index)} className="w-full h-full absolute bottom-0 left-0 flex items-center justify-center bg-input transition-opacity opacity-0 hover:opacity-90 cursor-pointer border border-1 border-destructive border-dashed">
						<Trash2Icon className="mr-2 h-6 w-6 stroke-destructive" />
					</div>
				</div>
			) 
		})
	},[imgList])

	return (
		<div>
			<div className="flex flex-wrap flex-start gap-2 flex-row">
				{preparedImgList}
				<label className="w-32 h-32 border border-2 border-placeholder border-dashed flex items-center justify-center cursor-pointer hover:bg-secondary">
					<PlusIcon className="mr-2 h-10 w-10 stroke-placeholder" />
					<input hidden type="file" accept="image/*" multiple onChange={handleImageUpload} />
				</label>
			</div>
			<div className="mt-8">           
        <Button onClick={handleSubmit} type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Зберегти
         </Button>
      </div>
     </div>
	)
}


