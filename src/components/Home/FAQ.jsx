import React from 'react';

const FAQ = () => {
    return (
        <div className='max-w-350 mx-auto w-11/12 mt-40'>
            <div className='text-center lg:w-8/12 w-full mx-auto'>
                <h3 className='text-5xl font-bold text-[#104a51]'>Frequently Asked Question (FAQ)</h3>
                <p className='pt-5'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            <div className='mt-10'>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-4">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title font-semibold">How does this posture corrector work?</div>
                    <div className="collapse-content text-sm">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-4">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">Is it suitable for all ages and body types?</div>
                    <div className="collapse-content text-sm">Yes, our products/services are designed to be suitable for people of all ages and body types. We focus on comfort, flexibility, and inclusivity to ensure a great experience for everyone</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-4">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">Does it really help with back pain and posture improvement?</div>
                    <div className="collapse-content text-sm">Yes, many users experience noticeable relief from back pain and improved posture with regular use. It’s designed to provide proper support, encourage healthy alignment, and reduce strain on the back and shoulders. However, results may vary depending on individual conditions and usage.
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-4">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">Does it have smart features like vibration alerts?</div>
                    <div className="collapse-content text-sm">Yes, some models come with smart features like vibration alerts and posture reminders to help you maintain healthy sitting habits throughout the day. Feature availability may vary depending on the model.

                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-4">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold">How will I be notified when the product is back in stock?</div>
                    <div className="collapse-content text-sm">Once the product is back in stock, you’ll be notified via email or SMS if you’ve signed up for back-in-stock alerts. Simply enter your contact information on the product page to receive updates.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;