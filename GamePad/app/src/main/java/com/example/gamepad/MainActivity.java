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
    private Button btnStart;

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
        //btnLeft = findViewById(R.id.btnLeft);
        btnDown = findViewById(R.id.Backward);
        btnUp = findViewById(R.id.Forward);
        //btnRight = findViewById(R.id.btnRight);
        btnStart = findViewById(R.id.start);




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


        btnStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mSocket.emit("start-game");
            }
        });
        ListenRotate();
    }
    void ListenRotate() {
        myOrientationEventListener = new OrientationEventListener(getApplicationContext(), 1000) {
            @Override
            public void onOrientationChanged(int orientation) {


                if ((orientation > 240 && orientation < 290 ) && direction != "straight"){
                    mSocket.emit("go-straight");

                    direction = "straight";

                }
                if ((orientation > 270 ) && direction != "right"){
                    mSocket.emit("go-right");
                    direction = "right";

                }
                if ((orientation < 260)  && direction != "left"){
                    mSocket.emit("go-left");
                    direction = "left";

                }

            }
        };
        myOrientationEventListener.enable();
    }



}