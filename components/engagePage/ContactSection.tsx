import React from "react";

type ContactSectionProps = {
  title: string;
  subtitle: string;
  email?: {
    label: string;
    value: string;
  };
  contact?: {
    label: string;
    values: string[];
  };
  location?: {
    label: string;
    address: string;
    postalCode: string;
  };
  workHours?: {
    label: string;
    hours: string;
  };
};

const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  subtitle,
  email,
  contact,
  location,
  workHours,
}) => {
  return (
    <div className="border-t border-l border-r border-gray-400 text-white">
      {/* HEADER */}
      <div className="relative border-b border-gray-400">

  {/* OVERLAP HORIZONTAL LINE */}
  <span
    className="
      absolute
      top-0
      left-0
      right-0
      h-px
      bg-gray-400
      z-20
    "
  />

  <div className="pl-12 pr-15 py-50">

          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 border border-gray-500 rounded-full flex items-center justify-center">
              <span className="w-2 h-2 border border-gray-500 rotate-45" />
            </span>
          </div>

          <h2 className="text-4xl font-light mb-3">{title}</h2>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>

      {/* GRID */}
      <div className="border-t border-gray-400">
        <div className="grid grid-cols-3">
          {/* LEFT COLUMN */}
          <div className="relative border-r border-gray-400 pl-12 pr-8 py-8">
            {email && (
              <div className="relative pb-8">
                {/* FULL WIDTH DIVIDER */}
                <span className="absolute left-[-48px] right-[-32px] bottom-0 h-px bg-gray-400" />

                <p className="text-xs text-gray-400 mb-2">
                  {email.label}
                </p>
                {email.value.split("\n").map((line, idx) => (
                  <p key={idx} className="text-sm">
                    {line}
                  </p>
                ))}
              </div>
            )}

            {contact && (
              <div className="pt-8">
                <p className="text-xs text-gray-400 mb-2">
                  {contact.label}
                </p>
                {contact.values.map((value, idx) => (
                  <p key={idx} className="text-sm">
                    {value}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* CENTER COLUMN (FIXED CONTACT IMAGE) */}
          <div className="relative border-r border-gray-400 flex items-center justify-center">
            <div className="animate-float">
              <img
                src="/contact.png"
                alt="Single Point Contact"
                className="w-[128px] h-[75px]"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="p-8 pr-15">
            {location && (
              <div className="mb-8">
                <p className="text-xs text-gray-400 mb-2">
                  {location.label}
                </p>
                <p className="text-sm">{location.address}</p>
                <p className="text-sm text-gray-400">
                  {location.postalCode}
                </p>
              </div>
            )}

            {workHours && (
              <div>
                <p className="text-xs text-gray-400 mb-2">
                  {workHours.label}
                </p>
                <p className="text-sm">{workHours.hours}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
