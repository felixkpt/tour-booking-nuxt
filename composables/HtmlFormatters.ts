const HtmlFormatters = {
  thumbNail(src: any, alt?: string): string {
    return `
        <span class="block overflow-hidden rounded shadow w-[40px] h-[40px]">
          <img src="${src || '-'}" ${alt ? 'alt="' + alt + '"' : ''} class="w-full h-full object-cover" />
        </span>
      `;
  },
};
export default HtmlFormatters