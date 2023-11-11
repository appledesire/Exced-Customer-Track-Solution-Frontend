"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { CartData, IdentifyData, ScreenInfo, ScreenType } from "@/lib/types";
import { getScreenResolution, isMobile, isTablet } from "@/lib/helpers";
import { postCartInfoData, postIdentifyData } from "@/api";
import { setCartData, setNumberOfProducts } from "@/redux/features/cart";
import { useDispatch, useSelector } from "react-redux";

import { setIdentifyData } from "@/redux/features/identify";
import { setScreenData } from "@/redux/features/screen";
import { useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState<string>("");
  const identify = useSelector((state: RootState) => state.identifyReducer);
  const cart = useSelector((state: RootState) => state.cartReducer);
  const [cartInfo, setCartInfo] = useState<string>("0");
  const dispatch = useDispatch<AppDispatch>();

  const sendIdentifyRequest = () => {
    if (userId.length == 0) {
      alert("User ID is required");
      return;
    }

    dispatch(setIdentifyData(userId));
    dispatch(setNumberOfProducts("0"));

    // Getting current page name
    var currentPageName = window.location.pathname.split("/").pop();
    console.log("Current Page Name is: ", currentPageName);

    const identifyData: IdentifyData = {
      userId: userId,
    };

    console.log("Sending identify event: ", identifyData);

    postIdentifyData("http://13.52.98.192:8080/identify", identifyData);
  };

  // Function to set Cart Information with simple validation
  const pushingCartInfo = () => {
    // Simple validation: without user verify, can't add cart
    if (identify.userId.length == 0) {
      alert("Your user information need to be submitted");
      return;
    }
    const tempCartInfo = (parseInt(cartInfo) + 1).toString();
    dispatch(setCartData(tempCartInfo));
    setCartInfo(tempCartInfo);
  };

  // Function to send Cart Information
  function sendTrackCartRequest() {
    const trackData: CartData = {
      userId: identify.userId,
      event: "added_to_cart",
      data: {
        productName: "test",
        numberOfProduct: cart.data.numberOfProduct,
        price: "test_price",
      },
    };

    postCartInfoData("http://13.52.98.192:8080/track", trackData);
  }

  // Function to send Screen Information
  function sendTrackScreenRequest() {
    // Simple validation: without user verify, can't send request
    if (identify.userId.length == 0)
      alert("Your user information need to be submitted");
    const screenResolution = getScreenResolution();
    let screenType: ScreenType = "desktop";
    if (isMobile()) {
      screenType = "mobile";
    } else if (isTablet()) {
      screenType = "tablet";
    }
    const screenInfo: ScreenInfo = {
      userId: identify.userId,
      data: {
        resolution: screenResolution.width + " x " + screenResolution.height,
        type: screenType,
      },
    };
    console.log(screenInfo);

    postCartInfoData("http://13.52.98.192:8080/screen", screenInfo);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 px-4 lg:px-24">
      <div className="card bg-base-100 shadow-xl lg:min-w-[700px] xl:w-[40%] md:w-[50%] w-full">
        <div className="card-body">
          <h1 className="card-title">Customer.io Event Tester</h1>
          <div className="w-full flex flex-col gap-4 mt-6">
            <div className="flex lg:flex-row lg:items-center gap-2 w-full flex-col">
              <label className="form-control">User ID</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered lg:flex-1"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserId(e.currentTarget.value)
                }
              />
              <button className="btn btn-success" onClick={sendIdentifyRequest}>
                Identify
              </button>
            </div>
            <div className="flex lg:flex-row lg:items-center gap-2 w-full flex-col">
              <button className="btn btn-primary" onClick={pushingCartInfo}>
                Add Cart
              </button>
              <input
                type="text"
                placeholder="0"
                className="form-control input input-bordered lg:flex-1"
                value={cartInfo}
                disabled
              />
              {/* <input
                type="text"
                placeholder="0"
                className="form-control input input-bordered lg:flex-1"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCartInfo(e.currentTarget.value)
                }
                disabled
              /> */}
              <button
                className="btn btn-primary"
                onClick={sendTrackCartRequest}
              >
                Track Cart Button
              </button>
            </div>
          </div>
          <div className="card-actions justify-end mt-6">
            <button
              className="btn btn-primary w-full lg:w-auto"
              onClick={sendTrackScreenRequest}
            >
              Track Screen Info
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
