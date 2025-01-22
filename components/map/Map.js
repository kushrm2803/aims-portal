"use client";

const Map = () => {
  return (
    <div className="rounded-md overflow-hidden shadow-md w-10/12">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52881.46084299939!2d76.46753511145842!3d30.97318544060749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905542fe45e58f7%3A0x5d16c2617cfdbdb8!2sIndian%20Institute%20Of%20Technology%E2%80%93Ropar%20(IIT%E2%80%93Ropar)!5e1!3m2!1sen!2sin!4v1737527901777!5m2!1sen!2sin"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="IIT Ropar Location Map"
      ></iframe>
    </div>
  );
};

export default Map;
