import PropTypes from 'prop-types';
import ButtonPrimary from '../misc/ButtonPrimary';

const Loader = props => {
  let { buttontext, className, isloading, isbutton } = props;
  isloading = isbutton ? isbutton : isloading;
  // isloading = isbutton ? true : false;

  return (
    <> {
      isloading ? (
        isbutton ?
          <ButtonPrimary addClass={className} disabled {...props}>
            {/* <Spinner className='me-6' size='sm' /> */}
            <div className="w-6 h-6 rounded-full animate-spin
                    border border-solid border-yellow-500 border-t-transparent"></div>
            <span className='pl-3'>{buttontext}</span>
          </ButtonPrimary> :
          <div
            className='flex justify-center items-center w-full h-full absolute'
            style={{
              position: 'absolute',
              zIndex: '30',
              opacity: '0.5',
              top: '0',
              left: '0',
              right: '0',
            }}
          >
            <div className="w-12 h-12 rounded-full animate-spin
                    border-2 border-solid border-primary-500 border-t-transparent"></div>
            {/* <span className="spinner-border text-primary" role="status" aria-hidden="true"></span> */}
          </div>
      ) : <></>
    }</>
  )
}

export default Loader

Loader.defaultProps = {
  buttontext: "Loading...",
  className: '',
  isbutton: false,
  isloading: false,
};

Loader.propTypes = {
  buttontext: PropTypes.string,
  className: PropTypes.string,
  isbutton: PropTypes.bool,
  isloading: PropTypes.bool,
};
