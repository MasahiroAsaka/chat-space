require 'rails_helper'

describe MessagesController, type: :controller do
  let(:user) {create(:user)}
  #userをcreateし、let内に格納
  let(:group) {create(:group)}

  describe 'GET #index' do

    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it "assigns @message" do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it "assigns @group" do
        expect(assigns(:group)).to eq group
      end

      it "render index" do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id}
      end

      it 'redirect to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end


  describe '#create' do
    let(:params) {{group_id: group.id, user_id: user.id, message: attributes_for(:message)}}
    # メッセージを作成するアクション
    context 'log in' do
      before do
        login user
      end
    # ログインしているかつ、保存に成功した場合
      context 'can save' do
        subject{
          post :create,
          params: params
        }
    # メッセージの保存はできたのか
        it 'count up message' do
          expect{subject}.to change(Message, :count).by(1)
        end
    # 意図した画面に遷移しているか
        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end
    # ログインしているが、保存に失敗した場合
      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, text: nil, image: nil) } }

        subject{
          post :create,
          params: invalid_params
        }
    # メッセージの保存は行われなかったか
        it 'dose not count up' do
          expect{subject}.not_to change(Message, :count)
        end
    # 意図したビューが描画されているか
        it 'render index' do
          subject
          expect(response).to render_template :index
        end
      end
    end
    # ログインしていない場合
    context 'not log in' do
    # 意図した画面にリダイレクトできているか
      it 'redirect to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
