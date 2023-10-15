/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function FAQsSection(faqs: any) {
  console.log(faqs);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-2xl font-extrabold text-fuchsia-500">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-md text-gray-500">
              Can't find the answer you're looking for? Reach out to our{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                customer support
              </a>{" "}
              team.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {faqs.map((faq: any) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-md">
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-blue-500">
                          <span className="font-medium text-blue-500">
                            {faq.question}
                          </span>
                          <span className="ml-6 h-7 flex items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-sm text-gray-500">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
