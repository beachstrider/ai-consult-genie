function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  viewAssistants: any
  setViewAssistants: any
  number_all: any
  number_contacts: any
  number_noncontacts: any
}

export default function TabsBar({
  viewAssistants,
  setViewAssistants,
  number_all,
  number_contacts,
  number_noncontacts,
}: Props) {
  let tabs = [
    {
      name: "All",
      icon: "",
      count: number_all,
    },
    {
      name: "Contacted",
      icon: "",
      count: number_contacts,
    },
    {
      name: "Others",
      icon: "",
      count: number_noncontacts,
    },
  ]
  console.log(viewAssistants)

  return (
    <div className="flex justify-center">
      <div className="px-2 flex justify-center">
        <div
          className="z-0 rounded-full flex bg-slate-300 dark:bg-slate-700"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={classNames(
                tab.name == viewAssistants
                  ? "text-white bg-gradient-to-r  from-[#bf4c96] via-[#e64688] to-[#ef825f] "
                  : "text-white hover:bg-gradient-to-r  from-[#bf4c96] via-[#e64688] to-[#ef825f] ",
                "group relative min-w-0 flex-1 whitespace-nowrap rounded-full px-4 py-1 font-medium text-xs text-center flex justify-center items-center dark:brightness-50"
              )}
              aria-current={tab.name == viewAssistants ? "page" : undefined}
              onClick={() => setViewAssistants(tab.name)}
            >
              {/* <img
                className="mr-1 h-4 w-4 text-indigo-300"
                src={tab.icon}
                aria-hidden="true"
              /> */}
              <span className="mx-2">{tab.name}</span>

              {/* {tab.count ? ( */}
              <span
                className={classNames(
                  tab.name == viewAssistants
                    ? "bg-fuchsia-200 text-indigo-600"
                    : "bg-fuchsia-200 text-indigo-600",
                  "ml-1 py-0.5 px-1 rounded-full text-[10px] font-medium md:inline-block"
                )}
              >
                {tab.count}
              </span>
              {/* ) : null} */}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
