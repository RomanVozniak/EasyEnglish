using EasyEnglishApi.DataAccess;

namespace EasyEnglishApi.Services
{
    public class ServiceBase
    {
        protected IUnitOfWork _unitOfWork { get; set; }

        public ServiceBase(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
    }
}
