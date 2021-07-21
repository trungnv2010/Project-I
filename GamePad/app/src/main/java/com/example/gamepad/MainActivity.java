package com.example.gamepad;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.MotionEvent;
import android.view.OrientationEventListener;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;

public class MainActivity extends AppCompatActivity {
    private Socket mSocket;
    private Button btnLeft;
    private Button btnRight;
    private Button btnUp;
    private Button btnDown;
    private OrientationEventListener myOrientationEventListener;
    private String direction = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        try {
                mSocket = IO.socket("http://192.168.1.16:3000");
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
        mSocket.connect();
        btnLeft = findViewById(R.id.btnLeft);
        btnDown = findViewById(R.id.btnGoBackward);
        btnUp = findViewById(R.id.btnGoForward);
        btnRight = findViewById(R.id.btnRight);

        btnLeft.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_DOWN){
                    mSocket.emit("go-left");
                } else if (event.getAction() == MotionEvent.ACTION_UP){
                    mSocket.emit("go-left-stop");
                }
                return true;
            }
        });

        btnRight.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_DOWN){
                   mSocket.emit("go-right");
                } else if (event.getAction() == MotionEvent.ACTION_UP){
                    mSocket.emit("go-right-stop");
                }
                return true;
            }
        });

        btnUp.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_DOWN){
                    mSocket.emit("go-forward");
                } else if (event.getAction() == MotionEvent.ACTION_UP){
                    mSocket.emit("go-forward-stop");
                }
                return true;
            }
        });

        btnDown.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_DOWN){
                    mSocket.emit("go-backward");
                } else if (event.getAction() == MotionEvent.ACTION_UP){
                    mSocket.emit("go-backward-stop");
                }
                return true;
            }
        });
        //ListenRotate();
    }
    void ListenRotate() {
        myOrientationEventListener = new OrientationEventListener(getApplicationContext(), 215) {
            @Override
            public void onOrientationChanged(int orientation) {


                if (((orientation > 260 && orientation < 270) || (orientation > 85 && orientation < 95)) && direction != "straight"){
                    mSocket.emit("go-straight");
                    direction = "straight";

                }
                if (((orientation > 270 ) || (orientation > 95 && orientation < 110)) && direction != "right"){
                    mSocket.emit("go-right");
                    direction = "right";

                }
                if ((( orientation < 260) || (orientation > 75 && orientation < 85)) && direction != "left"){
                    mSocket.emit("go-left");
                    direction = "left";

                }

            }
        };
        myOrientationEventListener.enable();
    }



}