import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Button } from '@/components/ui/button';
import { Facebook, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ConnectFacebookProps {
  onConnected: (profileUrl: string) => void;
}

export default function ConnectFacebook({ onConnected }: ConnectFacebookProps) {
  const [isVerified, setIsVerified] = useState(false);

  // 1. Callback when Facebook returns the token
  const responseFacebook = async (response: any) => {
    if (response.accessToken) {
      console.log("Token received:", response.accessToken);
      
      // 2. Simulate Backend Verification (In real app, fetch('/api/verify-fb', ...))
      // Ideally, you send the accessToken to your server here.
      
      // For now, we assume success if we got a token:
      setIsVerified(true);
      
      // Facebook provides an 'userID'. We construct a link (or use the one from response)
      // Note: Modern FB API hides the public link, but gives us a name/id we can trust.
      const mockProfileLink = `https://facebook.com/${response.userID}`; 
      
      onConnected(mockProfileLink); // Tell the parent form we are done
      toast.success(`Connected as ${response.name}`);
    } else {
      toast.error("Facebook connection failed.");
    }
  };

  if (isVerified) {
    return (
      <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-blue-800">
        <div className="flex items-center gap-3">
          <Facebook className="w-5 h-5" />
          <span className="font-semibold">Facebook Verified</span>
        </div>
        <CheckCircle className="w-5 h-5 text-blue-600" />
      </div>
    );
  }

  return (
    <FacebookLogin
      appId="YOUR_FACEBOOK_APP_ID_HERE" // <--- Paste ID from Step A
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      render={(renderProps) => (
        <Button
          type="button"
          onClick={renderProps.onClick}
          className="w-full bg-[#1877F2] hover:bg-[#1865C9] text-white h-12 text-lg gap-2"
          disabled={renderProps.isProcessing}
        >
          {renderProps.isProcessing ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Facebook className="w-5 h-5" />
          )}
          Connect Facebook
        </Button>
      )}
    />
  );
}