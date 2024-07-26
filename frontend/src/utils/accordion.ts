export class Accordion {
  private accordionElement: HTMLElement;
  private items: NodeListOf<Element>;

  constructor(accordionId: string) {
    this.accordionElement = document.getElementById(accordionId) as HTMLElement;
    if (!this.accordionElement) {
      throw new Error(`Accordion with id "${accordionId}" not found`);
    }
    this.items = this.accordionElement.querySelectorAll(".accordion-item");
    this.init();
  }

  public init(): void {
    this.items.forEach((item, index) => {
      const header = item.querySelector(".accordion-header") as HTMLElement;
      const content = item.querySelector(".accordion-content") as HTMLElement;

      if (header && content) {
        header.addEventListener("click", () => this.toggleItem(index));
        // Initialize all items as closed
        content.style.maxHeight = "0";
        content.style.overflow = "hidden";
        content.style.transition = "max-height 0.3s ease-out";
      }
    });
  }

  private toggleItem(index: number): void {
    this.items.forEach((item, i) => {
      const content = item.querySelector(".accordion-content") as HTMLElement;
      if (i === index) {
        item.classList.toggle("active");
        if (item.classList.contains("active")) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = "0";
        }
      } else {
        item.classList.remove("active");
        content.style.maxHeight = "0";
      }
    });
  }
}
