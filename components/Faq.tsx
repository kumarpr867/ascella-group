import Arrow from "./btns/Arrow";
import PlusHeading from "./headings/PlusHeading";

export default function Faq() {
  return (<section className='px-30 p-20 lg:py-30 grid lg:grid-cols-3'> <div className="flex flex-col gap-4 py-10 max-w-2xs">
    <PlusHeading text={'FAQs'} size="lg"/>
    <h1 className="text-3xl ">Frequently<br />
      Asked Questions</h1>
    <p className="font-extralight text-white/50"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </p>
  </div> <div className="faq">
      <div className="flex">
        <h2>What is Ascella Group?</h2>
      </div>
      <div className="flex">
        <Arrow />
      </div>
    </div>
    <div className="faq">
      <div className="flex">

        <h2>What is Ascella Group?</h2>
      </div> <div className="flex">
        <Arrow /> </div>
    </div>
    <div className="faq">
      <div className="flex">
        <h2>What is Ascella Group?</h2>
      </div>
      <div className="flex"> <Arrow />
      </div>
    </div>
    <div className="faq">

      <div className="flex">
        <h2>What is Ascella Group?</h2>
      </div> <div className="flex"> <Arrow />
      </div>
    </div>
  </section>)
}
