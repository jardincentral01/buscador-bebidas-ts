import { Fragment, useEffect, useMemo, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Search } from '../types'
import { useAppStore } from '../stores/useAppStore'


type SelectCategoryProps = {
    search: Search
    setSearch: React.Dispatch<React.SetStateAction<Search>>
}

export default function SelectCategory({search, setSearch}: SelectCategoryProps) {
  
  const [strCat, setStrCat] = useState("")
  const categories = useAppStore(state => state.categories.drinks)

  //const selectedCategory = useMemo(() => categories.find(cat => cat.strCategory == strCat), [strCat])

  const handleChange = (value:string) =>{
    setStrCat(value)
  }

  useEffect(() => {
    setSearch({
        ...search,
        category: strCat
    })
  }, [strCat])

  return (
    <div className="">
      <Listbox value={search.category} onChange={handleChange}>
        <div className="">
          <Listbox.Button id='category' className="relative w-full cursor-default p-3 rounded-lg bg-white text-left focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-400 ">
            <span className="block truncate">{search?.category || "-- Seleccione --"}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
            <Listbox.Option
                    className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                    }`}
                    value={""}
                >
                    {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        -- Seleccione --
                      </span>
                      {selected ? (
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 bg-orange-100 text-orange-900 `}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              {categories.map(cat => (
                <Listbox.Option
                  key={cat.strCategory}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                    }`}
                  value={cat.strCategory}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {cat.strCategory}
                      </span>
                      {selected ? (
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 bg-orange-100 text-orange-900 `}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
