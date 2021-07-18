package com.example.gamepad;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;

public class MainActivity extends AppCompatActivity {
    private Socket mSocket;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        {
            try {
                mSocket = IO.socket("http://192.168.1.16:3000");
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
        }
        mSocket.connect();
    }

    public void goForward(View view) {
        mSocket.emit("go-forward");
    }

    public void goBackward(View view) {
        mSocket.emit("go-backward");
    }

    public void left(View view) {
        mSocket.emit("go-left");
    }

    public void right(View view) {
        mSocket.emit("go-right");
    }
}