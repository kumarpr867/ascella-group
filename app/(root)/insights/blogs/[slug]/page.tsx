import { blogsWithSlug } from "@/data/blogs"
import { caseStudiesWithSlug } from "@/data/case-studies"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return [
    ...caseStudiesWithSlug.map((item) => ({ slug: item.slug })),
    ...blogsWithSlug.map((item) => ({ slug: item.slug })),
  ]
}

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params

  const blog = blogsWithSlug.find(
    (item) => item.slug === slug
  )

  if (!blog) return notFound()

  return (
    <div>
    <section className="relative border-y border-color mb-20">
      <div className="max-w-7xl mx-auto lg:border-x border-color px-10 lg:px-0">
        <div className="min-h-screen flex lg:flex-row flex-col">

          {/* MAIN CONTENT */}
          <main className="lg:w-[75%] lg:border-r border-color min-w-0">
            <div className="border-b border-color md:p-10 py-10">
              <p className="md:block hidden text-b2 mb-4">
                Ascella Group &nbsp;|&nbsp; {blog.category} &nbsp;|&nbsp; {blog.date}
              </p>
              <p className="md:hidden block text-b3 mb-4">
                Ascella Group | {blog.category} | {blog.date}
              </p>

              <h2 className="text-[20px] md:text-[36px] lg:text-[48px] font-light">
                {blog.title}
              </h2>
            </div>
            <div className="relative h-[400px] border-b border-color">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="text-gray-200 md:p-10 ">

              <p className="text-[12px] leading-regular my-4">
                For decades, the world of Operational Technology (OT), the
                industrial control systems, SCADA networks, and PLCs that
                physically run our factories, power grids, and water treatment
                plants, was an island.
              </p>

              <p className="text-[12px] leading-regular my-4">
                Digital transformation and Industry 4.0 have bridged that air gap.
                Today OT systems are increasingly connected to enterprise IT
                networks to enable remote monitoring and predictive maintenance.
              </p>

              <h3 className="text-white my-4">Why Operational Technology Security is the New Frontline</h3 >

              <p className="text-[12px] leading-regular my-4">
                The threat landscape for industrial environments has shifted
                dramatically. Ransomware attacks on OT systems are increasing,
                making security a board-level concern.
              </p>
              <p className="text-[12px] leading-regular my-4">In 2025, defending OT is becoming a board-level responsibility. The market for Operational Technology security is projected to explode to $50.29 billion by 2030, driven by the sheer urgency of protecting critical infrastructure from increasingly sophisticated ransomware and state-sponsored actors.</p>
              <p className="text-[12px] leading-regular my-4">We are seeing three major trends driving this urgency:</p>
              <ol className="list-decimal">
                <li className="text-[12px] my-2">IT/OT Convergence: 70% of OT systems are projected to connect to IT networks in the coming year. Crucially, 75% of OT attacks now start as IT breaches, exploiting the trusted pathways between the corporate network and the plant floor</li>
                <li className="text-[12px] my-2">Ransomware Evolution: Ransomware attacks on OT have surged by 300% in the past year alone. Attackers are now targeting industrial control systems directly, with devastating consequences. The average ransom demand for OT attacks has skyrocketed to $5 million, reflecting the critical nature of these systems.</li>
                <li className="text-[12px] my-2">Regulatory Pressure: Governments worldwide are enacting stricter regulations for OT security. The U.S. has introduced the Cybersecurity Maturity Model Certification (CMMC) for critical infrastructure, while the EU is implementing the NIS2 Directive, mandating robust cybersecurity measures for essential services.</li>
              </ol>

              <h3 className="text-white my-4">The Core Challenge: The “Insecure by Design” Legacy</h3>

              <p className="text-[12px] leading-regular my-4">Securing Operational Technology is not as simple as “installing antivirus.” The fundamental architecture of OT environments presents unique hurdles that traditional IT security tools often break.</p>
              <ol className="my-4 list-decimal">
                <li className="text-white text-[16px] md:text-[24px]">The CIA Triad Flip</li>
                <p className="text-[12px] leading-regular my-4">
                  In IT security, Confidentiality is king, followed by Integrity and Availability. In Operational Technology , the priority is flipped: Availability is paramount.</p>
                <ol className="list-disc">
                  <li className="text-[12px] mb-2">Safety & Reliability First: You cannot simply patch a PLC (Programmable Logic Controller) or reboot a Human-Machine Interface (HMI) if it means stopping a blast furnace or a pharmaceutical production line.</li>
                  <li className="text-[12px] mb-2">Legacy Systems: Many OT environments run on decades-old hardware and software that were never designed with security in mind. These “insecure by design” systems are often incompatible with modern security solutions, creating a significant attack surface.</li>
                </ol>
                <li className="text-white text-[16px] md:text-[24px]">The Visibility Gap</li>
                <p className="text-[12px] leading-regular my-4">
                  In IT security, Confidentiality is king, followed by Integrity and Availability. In Operational Technology , the priority is flipped: Availability is paramount.</p>
                <ol className="list-disc">
                  <li className="text-[12px] mb-2">Safety & Reliability First: You cannot simply patch a PLC (Programmable Logic Controller) or reboot a Human-Machine Interface (HMI) if it means stopping a blast furnace or a pharmaceutical production line.</li>
                  <li className="text-[12px] mb-2">Legacy Systems: Many OT environments run on decades-old hardware and software that were never designed with security in mind. These “insecure by design” systems are often incompatible with modern security solutions, creating a significant attack surface.</li>
                </ol>
                <li className="text-white text-[16px] md:text-[24px]">The Legacy Burden</li>
                <p className="text-[12px] leading-regular my-4">
                  In IT security, Confidentiality is king, followed by Integrity and Availability. In Operational Technology , the priority is flipped: Availability is paramount.</p>
                <ol className="list-disc">
                  <li className="text-[12px] mb-2">Safety & Reliability First: You cannot simply patch a PLC (Programmable Logic Controller) or reboot a Human-Machine Interface (HMI) if it means stopping a blast furnace or a pharmaceutical production line.</li>
                  <li className="text-[12px] mb-2">Legacy Systems: Many OT environments run on decades-old hardware and software that were never designed with security in mind. These “insecure by design” systems are often incompatible with modern security solutions, creating a significant attack surface.</li>
                </ol>
              </ol>
              <h3 className="text-white my-6 text-[20px] md:text-[28px]">
                The Frameworks: Purdue, IEC 62443, and NIST
              </h3>

              <p className="text-[12px] leading-regular my-4">
                To secure complex industrial environments, organizations rely on established
                frameworks that define how Operational Technology networks should be designed
                and protected. However, these frameworks must evolve to support modern
                digital transformation and cloud connectivity.
              </p>

              <h3 className="text-white my-4 text-[18px] md:text-[24px]">
                The Purdue Model (and its Erosion)
              </h3>

              <p className="text-[12px] leading-regular my-4">
                The Purdue Enterprise Reference Architecture (PERA) has been the foundation
                of industrial network design for decades. It separates enterprise IT and
                operational systems into hierarchical levels to limit risk.
              </p>

              <ul className="list-disc pl-6">
                <li className="text-[12px] my-2">Level 4: Enterprise IT (ERP systems, email, business applications).</li>
                <li className="text-[12px] my-2">Level 3.5: The Industrial DMZ acting as a buffer between IT and OT.</li>
                <li className="text-[12px] my-2">Level 3: Site Operations (historians, engineering workstations).</li>
                <li className="text-[12px] my-2">Level 2/1/0: The control layer (HMIs, PLCs, sensors, actuators).</li>
              </ul>

              <p className="text-[12px] leading-regular my-4">
                The challenge is that modern IIoT devices often communicate directly with
                cloud services, bypassing traditional segmentation layers. Organizations must
                therefore rebuild logical security boundaries rather than relying only on
                physical network separation.
              </p>

              <h3 className="text-white my-8 text-[22px] md:text-[32px]">
                5 Strategic Steps to Secure Operational Technology Environments
              </h3>

              <p className="text-[12px] leading-regular my-4">
                Securing OT environments requires a phased approach. Instead of forcing
                traditional IT controls onto fragile industrial systems, organizations should
                prioritize visibility, segmentation, and operational resilience.
              </p>

              <h4 className="text-white text-[16px] md:text-[24px] my-4">
                Step 1: Asset Inventory and Visibility (Identify)
              </h4>

              <p className="text-[12px] leading-regular my-4">
                You cannot secure what you cannot see. Many organizations lack a real-time
                inventory of devices on their industrial networks.
              </p>

              <ul className="list-disc pl-6">
                <li className="text-[12px] my-2">
                  Passive Discovery: Use monitoring tools that analyze network traffic to
                  detect PLCs, HMIs, sensors, and firmware versions without disrupting
                  operations.
                </li>
                <li className="text-[12px] my-2">
                  Traffic Baselines: Establish communication patterns between devices to
                  quickly identify anomalies.
                </li>
              </ul>

              <h4 className="text-white text-[16px] md:text-[24px] my-4">
                Step 2: Network Segmentation (Protect)
              </h4>

              <p className="text-[12px] leading-regular my-4">
                Flat networks allow malware and ransomware to spread rapidly from corporate
                IT systems to the factory floor.
              </p>

              <ul className="list-disc pl-6">
                <li className="text-[12px] my-2">
                  Implement an Industrial DMZ between IT and OT environments.
                </li>
                <li className="text-[12px] my-2">
                  Use VLANs and industrial firewalls to segment production zones and limit
                  lateral movement.
                </li>
              </ul>

              <h4 className="text-white text-[16px] md:text-[24px] my-4">
                Step 3: Secure Remote Access (Protect)
              </h4>

              <p className="text-[12px] leading-regular my-4">
                Remote vendor access is one of the most common attack vectors in OT breaches.
              </p>

              <ul className="list-disc pl-6">
                <li className="text-[12px] my-2">
                  Enforce Multi-Factor Authentication (MFA) for all remote sessions.
                </li>
                <li className="text-[12px] my-2">
                  Use Secure Remote Access gateways that provide just-in-time access and
                  session monitoring.
                </li>
              </ul>

              <h4 className="text-white text-[16px] md:text-[24px] my-4">
                Step 4: Vulnerability Management & Patching (Protect)
              </h4>

              <p className="text-[12px] leading-regular my-4">
                Patching in OT environments is challenging because downtime can disrupt
                critical industrial processes.
              </p>

              <ul className="list-disc pl-6">
                <li className="text-[12px] my-2">
                  Focus on high-risk vulnerabilities that are actively exploited.
                </li>
                <li className="text-[12px] my-2">
                  Implement virtual patching using intrusion prevention systems when devices
                  cannot be updated.
                </li>
              </ul>

              <h4 className="text-white text-[16px] md:text-[24px] my-4">
                Step 5: OT-Specific Monitoring (Detect & Respond)
              </h4>

              <p className="text-[12px] leading-regular my-4">
                Traditional IT security tools often fail to detect threats within industrial
                control systems. OT environments require specialized monitoring.
              </p>

              <ul className="list-disc pl-6">
                <li className="text-[12px] my-2">
                  Behavioral monitoring tools can detect unusual PLC commands or unexpected
                  device communication.
                </li>
                <li className="text-[12px] my-2">
                  Develop OT-specific incident response playbooks in collaboration with plant
                  operators.
                </li>
              </ul>

              <h3 className="text-white text-[22px] md:text-[32px] my-10">
                The Cultural Gap: Bridging IT and OT Teams
              </h3>

              <p className="text-[12px] leading-regular my-4">
                Technology alone cannot secure industrial systems. The most successful OT
                security strategies bring together IT security teams and operational
                engineers. While IT focuses on confidentiality and data protection, OT teams
                prioritize safety and uptime. Bridging this cultural gap is essential to
                building resilient industrial environments.
              </p>

              <p className="text-[12px] leading-regular my-4">
                Organizations that successfully integrate IT and OT security strategies will
                be far better positioned to defend critical infrastructure in an era of
                increasing cyber threats.
              </p>
            </div>
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="relative pt-10 w-full lg:w-[250px]">
            <div className=" sticky top-10">

              {/* blogs */}
              <div>
                <h3 className="text-lg font-medium md:px-10 capitalize">
                  Read More Blogs
                </h3>

                <div className="md:px-10 sm:px-4 py-4">
                  {blogsWithSlug
                    .filter((b) => b.slug !== blog?.slug)
                    .slice(0, 2)
                    .map((item) => (
                      <Link
                        key={item.id}
                        href={`/insights/blogs/${item.slug}`}
                      >
                        <div className="group bg-gray-500 border border-neutral-800 rounded-xl p-4 hover:border-neutral-500 transition-all duration-300 mb-4">
                          <div className="max-w-sm">
                            <h5 className="text-[16px] md:text-[24px] font-light mb-2 line-clamp-1">
                              {item.title}
                            </h5>

                            <p className="text-xs  mb-4 line-clamp-2">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex justify-between items-center">

                            <div className="w-6 h-6 border border-color p-1">
                              <svg viewBox="0 0 20 20" fill="true" xmlns="http://www.w3.org/2000/svg">
                                <line x1="10.25" y1="1.09278e-08" x2="10.25" y2="7" stroke="white" stroke-width="0.5" />
                                <line x1="10.25" y1="13" x2="10.25" y2="20" stroke="white" stroke-width="0.5" />
                                <line x1="13" y1="9.75" x2="20" y2="9.75" stroke="white" stroke-width="0.5" />
                                <line y1="9.75" x2="7" y2="9.75" stroke="white" stroke-width="0.5" />
                              </svg>

                            </div>

                            <span className="text-xs px-4 py-2 bg-gray-400 rounded-md ">
                              {item.category}
                            </span>

                          </div>

                        </div>
                      </Link>
                    ))}
                </div>
              </div>


              {/* case studies */}
              <div>
                <h3 className="text-lg font-medium md:px-10 capitalize">
                  Read case studies
                </h3>

                <div className="md:px-10 sm:px-4 py-4">
                  {caseStudiesWithSlug
                    .filter((b) => b.slug !== blog?.slug)
                    .slice(0, 2)
                    .map((item) => (
                      <Link
                        key={item.id}
                        href={`/insights/case-studies/${item.slug}`}
                      >
                        <div className="group bg-gray-500 border border-neutral-800 rounded-xl p-4 hover:border-neutral-500 transition-all duration-300 mb-4">
                          <div className="max-w-sm">
                            <h5 className="text-[16px] md:text-[24px] font-light mb-2 line-clamp-1">
                              {item.title}
                            </h5>

                            <p className="text-xs  mb-4 line-clamp-2">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex justify-between items-center">

                            <div className="w-6 h-6 border border-color p-1">
                              <svg viewBox="0 0 20 20" fill="true" xmlns="http://www.w3.org/2000/svg">
                                <line x1="10.25" y1="1.09278e-08" x2="10.25" y2="7" stroke="white" stroke-width="0.5" />
                                <line x1="10.25" y1="13" x2="10.25" y2="20" stroke="white" stroke-width="0.5" />
                                <line x1="13" y1="9.75" x2="20" y2="9.75" stroke="white" stroke-width="0.5" />
                                <line y1="9.75" x2="7" y2="9.75" stroke="white" stroke-width="0.5" />
                              </svg>

                            </div>

                            <span className="text-xs px-4 py-2 bg-gray-400 rounded-md ">
                              {item.category}
                            </span>

                          </div>

                        </div>
                      </Link>
                    ))}
                </div>
              </div>


            </div>
          </aside>
        </div>
      </div >

    </section >
    </div>
  )
}