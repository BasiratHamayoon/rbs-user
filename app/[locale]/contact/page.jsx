import ContactHeading from "components/contact/ContactHeading";
import ContactInfo from "components/contact/ContactInfo";
import GeneralEnquiries from "components/contact/GeneralEnquiries";
import MoreInformation from "components/contact/MoreInformation";


export default function ContactPage() {
  return (
    <section className="bg-white w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <ContactHeading />
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mt-8 lg:mt-12 w-full">
          <div className="lg:col-span-1 space-y-6 lg:space-y-8 w-full">
            <ContactInfo />
          </div>
          <div className="lg:col-span-2 w-full">
            <GeneralEnquiries />
          </div> 
        </div>
        <MoreInformation />
      </div>
    </section>
  );
}