import { useForm } from "@refinedev/core";
import { createContext, useContext, useEffect, useState } from "react";

export const FormProviderContext = createContext<any>(null);
export const FormProvider = ({ children }: any) => {
    const [getSelectOption,setSelectOption] = useState<any>(1);
    const [getEmpty,setEmpty] = useState<any>(true);


    // for a single customselect field we need to  useState to set those values
    // use CustomSelect and subSelect to get the desired values

  return (
    <FormProviderContext.Provider value={{
        getSelectOption,
        setSelectOption,
        setEmpty,
        getEmpty
    }}>
      {children}
    </FormProviderContext.Provider>
  );
};

export const useFormProvider = () => {
  return useContext(FormProviderContext);
};
