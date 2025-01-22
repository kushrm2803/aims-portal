import Link from "next/link";
import Map from "@/components/map/Map";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mx-3 my-2 py-3 px-6 rounded-2xl shadow-lg">
      <div className="flex flex-wrap justify-between">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col space-y-4">
          <section>
            <p>
              <strong>AIMS Portal - IIT Ropar</strong>
              <br />
              Made for students and faculty!
            </p>
          </section>
          <div>
            <Map />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 md:mt-0">
          <div>
            <h6 className="footer-title font-bold mb-2">Quick Finds</h6>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Attendance Record
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Student Record
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Course Enrollment
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-300">
                  User Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="footer-title font-bold mb-2">Useful Links</h6>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  IIT Ropar Main Site
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-300">
                  IT Website
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Feedback Form
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="footer-title font-bold mb-2">Contact Details</h6>
            <p>IIT Ropar Main Campus, Baraphool, Rupnagar</p>
            <br />
            <p>Email: info@iitrpr.ac.in</p>
            <p>Phone: +91-123-456-7890</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
