import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@artisane.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+233 24 123 4567",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Accra, Ghana",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon – Fri\n9:00 AM – 6:00 PM",
  },
];

export default function ContactInfo() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B88A4A]">
        We'd Love To Hear From You
      </p>

      <div className="mt-10 space-y-8">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-start gap-5 border-b border-[#E8E1D9] pb-8"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#D9C7AF] bg-white">
                <Icon
                  size={26}
                  className="text-[#B88A4A]"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#2C241F]">
                  {item.title}
                </h3>

                <p className="mt-2 whitespace-pre-line text-[#766B63] leading-7">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}