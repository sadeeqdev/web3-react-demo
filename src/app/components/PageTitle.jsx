export const AppPageTitle = ({ heading, subHeading }) => (
  <div className="h-20 w-full border-b border-t border-gray-600 flex items-center">
    <div className="w-11/12 xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto flex-col text-white">
      <div className="font-semibold text-xl sm:text-lg mb-1 sm:mb-1">
        {heading}
      </div>
      <div className="text-gray-400 text-xs sm:text-sm">{subHeading}</div>
    </div>
  </div>
);
